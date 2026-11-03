import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  Users,
  Copy,
  Check,
} from "lucide-react";
import { SocketContext } from "../context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const socketContext = useContext(SocketContext);

  const [copied, setCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const stream = socketContext?.stream;
  const peers = socketContext?.peers || {};
  const isMuted = socketContext?.isMuted || false;
  const isVideoOff = socketContext?.isVideoOff || false;

  // Auto-join room when socket and peer are initialized
  useEffect(() => {
    if (socketContext && id) {
      socketContext.joinRoom(id);
    }
  }, [socketContext, id]);

  const copyRoomLink = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const peerKeys = Object.keys(peers);
  const totalParticipants = 1 + peerKeys.length;

  // Layout grid calculation
  const getGridClasses = () => {
    const totalTiles = 1 + peerKeys.length;
    if (totalTiles === 1) return "grid-cols-1 max-w-4xl";
    if (totalTiles === 2) return "grid-cols-1 md:grid-cols-2 max-w-5xl";
    if (totalTiles <= 4) return "grid-cols-1 sm:grid-cols-2 max-w-6xl";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl";
  };

  return (
    <div className="h-screen w-screen bg-white text-zinc-900 flex flex-col overflow-hidden font-sans select-none">
      {/* Top Floating App Bar */}
      <header className="h-16 px-6 bg-white border-b border-zinc-100 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 hover:border-zinc-300 transition-colors"
          >
            <Video className="w-4 h-4" />
          </button>
          <div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900 block">
              Veloxa Room
            </span>
            <p className="text-[11px] text-zinc-400 font-mono tracking-wider truncate max-w-[150px] sm:max-w-xs">
              {id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Share/Invite Button */}
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-xl text-xs font-medium border border-zinc-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-600" />
            <span className="hidden sm:inline">Invite</span>
          </button>

          {/* Participant count badge */}
          <div className="flex items-center gap-1.5 bg-zinc-50 text-zinc-600 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-zinc-200">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>{totalParticipants}</span>
          </div>
        </div>
      </header>

      {/* Main Video Arena */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto flex items-center justify-center bg-white">
        <div
          className={`grid gap-4 w-full h-full max-h-[82vh] transition-all duration-300 items-center justify-center ${getGridClasses()}`}
        >
          {/* Local User Tile */}
          <div className="w-full h-full min-h-[220px] flex items-center justify-center">
            <UserFeedPlayer
              stream={stream}
              userName="You"
              isSelf={true}
              muted={isMuted}
              isVideoOff={isVideoOff}
            />
          </div>

          {/* Remote Peer Tiles */}
          {peerKeys.map((peerId, index) => (
            <div
              key={peerId}
              className="w-full h-full min-h-[220px] flex items-center justify-center"
            >
              <UserFeedPlayer
                stream={peers[peerId].stream}
                userName={`Participant ${index + 1}`}
                isSelf={false}
              />
            </div>
          ))}

          {/* Zero Peers Placeholder Helper */}
          {peerKeys.length === 0 && (
            <div className="hidden lg:flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-2xl h-full min-h-[220px] p-6 text-center text-zinc-400 bg-zinc-50/50">
              <Users className="w-7 h-7 text-zinc-300 mb-2" />
              <p className="text-xs font-medium text-zinc-600">
                Waiting for others to join...
              </p>
              <p className="text-[11px] text-zinc-400 mt-1 max-w-xs">
                Copy the invite link and share it with your team members.
              </p>
              <button
                onClick={copyRoomLink}
                className="mt-3 text-xs bg-white hover:bg-zinc-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-zinc-200 flex items-center gap-1.5 transition-colors font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Meeting Link</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="h-20 bg-white border-t border-zinc-100 flex items-center justify-center px-6 z-30 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 bg-white px-4 py-2 rounded-2xl border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {/* Mic Toggle */}
          <button
            onClick={() => socketContext?.toggleMic()}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors text-xs font-medium ${
              isMuted
                ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Video Toggle */}
          <button
            onClick={() => socketContext?.toggleVideo()}
            title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isVideoOff
                ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-4 h-4" />
            ) : (
              <Video className="w-4 h-4" />
            )}
          </button>

          <div className="h-5 w-px bg-zinc-200 mx-1"></div>

          {/* Leave Call */}
          <button
            onClick={() => socketContext?.leaveRoom(id)}
            title="Leave Meeting"
            className="h-10 px-3.5 rounded-xl bg-zinc-100 hover:bg-rose-50 text-zinc-700 hover:text-rose-600 border border-zinc-200 hover:border-rose-200 flex items-center gap-1.5 transition-colors text-xs font-medium"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </footer>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white text-zinc-900 rounded-2xl p-6 max-w-md w-full border border-zinc-200 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-semibold text-sm text-zinc-900">
                Meeting Details
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-zinc-400 hover:text-zinc-600 text-sm p-1 rounded-lg hover:bg-zinc-50"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
              Anyone with this link or room code can join this call directly.
            </p>

            <div className="mt-4 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between gap-2">
              <span className="text-xs text-zinc-600 font-mono truncate select-all pl-1">
                {window.location.href}
              </span>
              <button
                onClick={copyRoomLink}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-3.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-xl text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;