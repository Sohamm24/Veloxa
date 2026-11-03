import React, { useEffect, useRef } from "react";
import { Mic, MicOff, User } from "lucide-react";

interface UserFeedPlayerProps {
  stream?: MediaStream | null;
  userName?: string;
  isSelf?: boolean;
  muted?: boolean;
  isVideoOff?: boolean;
}

const UserFeedPlayer: React.FC<UserFeedPlayerProps> = ({
  stream,
  userName = "Participant",
  isSelf = false,
  muted = false,
  isVideoOff = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const hasVideoTrack = stream
    ? stream.getVideoTracks().length > 0 && stream.getVideoTracks()[0].enabled && !isVideoOff
    : false;

  return (
    <div className="relative group w-full h-full min-h-[220px] max-h-[500px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-200">
      {/* Actual Video */}
      <video
        ref={videoRef}
        muted={isSelf || muted}
        autoPlay
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          hasVideoTrack ? "opacity-100" : "opacity-0"
        } ${isSelf ? "-scale-x-100" : ""}`}
      />

      {/* Video Off Placeholder Avatar */}
      {!hasVideoTrack && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-zinc-300">
          <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200 font-medium text-lg mb-2.5">
            {userName ? (
              userName.slice(0, 2).toUpperCase()
            ) : (
              <User className="w-8 h-8 text-zinc-400" />
            )}
          </div>
          <span className="text-xs font-medium text-zinc-200">{userName}</span>
          <span className="text-[11px] text-zinc-500 mt-0.5">Camera off</span>
        </div>
      )}

      {/* Top badges (e.g. You badge) */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        {isSelf && (
          <span className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            You
          </span>
        )}
      </div>

      {/* Bottom Bar: Name & Audio Status */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-2 max-w-[80%] truncate">
          <span className="truncate">{userName}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className={`p-1.5 rounded-lg backdrop-blur-md text-xs border border-white/10 ${
              muted || (isSelf && muted)
                ? "bg-rose-500/90 text-white"
                : "bg-black/50 text-white"
            }`}
          >
            {muted || (isSelf && muted) ? (
              <MicOff className="w-3.5 h-3.5" />
            ) : (
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedPlayer;