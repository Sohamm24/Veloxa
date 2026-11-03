import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import SocketIoClient, { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDv4 } from "uuid";
import Peer from "peerjs";
import type { PeerState } from "../Reducers/peerReducer";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction, removePeerAction } from "../Actions/peerAction";

const WS_SERVER = "http://localhost:5000";

interface SocketContextType {
  socket: Socket;
  user: Peer | null;
  stream: MediaStream | null;
  screenStream: MediaStream | null;
  peers: PeerState;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  toggleMic: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => Promise<void>;
  leaveRoom: (roomId?: string) => void;
  joinRoom: (roomId: string) => void;
  createRoom: () => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

const socket: Socket = SocketIoClient(WS_SERVER, {
  withCredentials: false,
  transports: ["polling", "websocket"],
});

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);

  const [peers, dispatch] = useReducer(peerReducer, {});
  const activeCalls = useRef<Record<string, any>>({});
  const streamRef = useRef<MediaStream | null>(null);
  const userRef = useRef<Peer | null>(null);

  // Keep refs synchronized for event listeners
  streamRef.current = stream;
  userRef.current = user;

  // Initialize Media Stream (Microphone & Camera)
  const fetchUserFeed = useCallback(async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      setStream(media);
      return media;
    } catch (err) {
      console.warn("Unable to access audio/video devices directly:", err);
      // Fallback empty stream with canvas if camera blocked so app won't crash
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const dst = osc.connect(audioCtx.createMediaStreamDestination()) as any;
        osc.start();
        const fakeTrack = dst.stream.getAudioTracks()[0];
        fakeTrack.enabled = false;
        const fakeStream = new MediaStream([fakeTrack]);
        setStream(fakeStream);
        return fakeStream;
      } catch (e) {
        return null;
      }
    }
  }, []);

  // Initialize PeerJS instance
  useEffect(() => {
    const userId = UUIDv4();
    // Default to standard PeerJS cloud broker (no manual local peer server required)
    const newPeer = new Peer(userId, {
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      },
    });

    newPeer.on("open", (id) => {
      console.log("PeerJS client initialized with ID:", id);
      setUser(newPeer);
    });

    fetchUserFeed();

    const handleRoomCreated = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", handleRoomCreated);

    return () => {
      socket.off("room-created", handleRoomCreated);
      newPeer.destroy();
    };
  }, [navigate, fetchUserFeed]);

  // Handle incoming calls and remote streams
  useEffect(() => {
    if (!user) return;

    // Incoming Call Handler
    const handleIncomingCall = (call: any) => {
      const currentStream = streamRef.current;
      console.log("Receiving call from peer:", call.peer);

      if (currentStream) {
        call.answer(currentStream);
      } else {
        // Answer without stream if local stream isn't ready yet
        call.answer();
      }

      call.on("stream", (remoteStream: MediaStream) => {
        console.log("Received remote stream from call:", call.peer);
        dispatch(addPeerAction(call.peer, remoteStream));
      });

      call.on("close", () => {
        console.log("Call closed by peer:", call.peer);
        dispatch(removePeerAction(call.peer));
      });

      activeCalls.current[call.peer] = call;
    };

    user.on("call", handleIncomingCall);

    return () => {
      user.off("call", handleIncomingCall);
    };
  }, [user]);

  // Socket room events
  useEffect(() => {
    if (!socket) return;

    const handleUserJoined = ({ peerId }: { peerId: string }) => {
      console.log("New user joined room:", peerId);
      const currentUser = userRef.current;
      const currentStream = streamRef.current;

      if (currentUser && currentStream && peerId !== currentUser.id) {
        console.log("Calling peer:", peerId);
        const call = currentUser.call(peerId, currentStream);

        if (call) {
          call.on("stream", (remoteStream: MediaStream) => {
            console.log("Received remote stream after calling:", peerId);
            dispatch(addPeerAction(peerId, remoteStream));
          });

          call.on("close", () => {
            dispatch(removePeerAction(peerId));
          });

          activeCalls.current[peerId] = call;
        }
      }
    };

    const handleUserDisconnected = ({ peerId }: { peerId: string }) => {
      console.log("User disconnected:", peerId);
      if (activeCalls.current[peerId]) {
        activeCalls.current[peerId].close();
        delete activeCalls.current[peerId];
      }
      dispatch(removePeerAction(peerId));
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, []);

  // Controls: Audio Mute/Unmute
  const toggleMic = useCallback(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  }, [stream]);

  // Controls: Video On/Off
  const toggleVideo = useCallback(() => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff((prev) => !prev);
    }
  }, [stream]);

  // Controls: Screen Sharing
  const toggleScreenShare = useCallback(async () => {
    if (!isScreenSharing) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        setScreenStream(displayStream);
        setIsScreenSharing(true);

        const videoTrack = displayStream.getVideoTracks()[0];

        // Replace track on all active peer connections
        Object.values(activeCalls.current).forEach((call: any) => {
          if (call.peerConnection) {
            const senders = call.peerConnection.getSenders();
            const sender = senders.find((s: any) => s.track && s.track.kind === "video");
            if (sender) {
              sender.replaceTrack(videoTrack);
            }
          }
        });

        videoTrack.onended = () => {
          // Revert back to camera when user stops sharing via browser bar
          if (stream) {
            const camVideoTrack = stream.getVideoTracks()[0];
            Object.values(activeCalls.current).forEach((call: any) => {
              if (call.peerConnection && camVideoTrack) {
                const senders = call.peerConnection.getSenders();
                const sender = senders.find((s: any) => s.track && s.track.kind === "video");
                if (sender) {
                  sender.replaceTrack(camVideoTrack);
                }
              }
            });
          }
          setScreenStream(null);
          setIsScreenSharing(false);
        };
      } catch (err) {
        console.error("Screen share cancelled or failed:", err);
      }
    } else {
      if (screenStream) {
        screenStream.getTracks().forEach((t) => t.stop());
      }
      if (stream) {
        const camVideoTrack = stream.getVideoTracks()[0];
        Object.values(activeCalls.current).forEach((call: any) => {
          if (call.peerConnection && camVideoTrack) {
            const senders = call.peerConnection.getSenders();
            const sender = senders.find((s: any) => s.track && s.track.kind === "video");
            if (sender) {
              sender.replaceTrack(camVideoTrack);
            }
          }
        });
      }
      setScreenStream(null);
      setIsScreenSharing(false);
    }
  }, [isScreenSharing, screenStream, stream]);

  // Join Room Helper
  const joinRoom = useCallback(
    (roomId: string) => {
      if (user && user.id) {
        socket.emit("joined-room", { roomId, peerId: user.id });
      }
    },
    [user]
  );

  // Leave Room Helper
  const leaveRoom = useCallback(
    (roomId?: string) => {
      socket.emit("leave-room");
      Object.values(activeCalls.current).forEach((call: any) => call.close());
      activeCalls.current = {};
      if (screenStream) {
        screenStream.getTracks().forEach((t) => t.stop());
        setScreenStream(null);
        setIsScreenSharing(false);
      }
      navigate("/");
    },
    [navigate, screenStream]
  );

  // Create Room Helper
  const createRoom = useCallback(() => {
    socket.emit("create-room");
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        user,
        stream,
        screenStream,
        peers,
        isMuted,
        isVideoOff,
        isScreenSharing,
        toggleMic,
        toggleVideo,
        toggleScreenShare,
        leaveRoom,
        joinRoom,
        createRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};