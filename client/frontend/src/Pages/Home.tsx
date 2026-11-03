import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Keyboard,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { SocketContext } from "../context/SocketContext";
import { Navbar } from "../Components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const socketContext = useContext(SocketContext);
  const [roomInput, setRoomInput] = useState("");
  const [inputError, setInputError] = useState("");

  const handleStartMeeting = () => {
    if (socketContext?.createRoom) {
      socketContext.createRoom();
    }
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = roomInput.trim();
    if (!cleanId) {
      setInputError("Please enter a valid room ID or link");
      return;
    }

    // Extract ID if a full URL was pasted
    const matches = cleanId.match(/room\/([a-zA-Z0-9-]+)/);
    const resolvedId = matches ? matches[1] : cleanId;

    navigate(`/room/${resolvedId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-emerald-50 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 max-w-5xl mx-auto w-full">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-600 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Peer-to-peer WebRTC video engine</span>
        </div>

        {/* Clean, editorial typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 text-center max-w-2xl leading-[1.12]">
          Frictionless video calls for focused teams.
        </h1>

        <p className="mt-5 text-zinc-500 text-base sm:text-lg text-center max-w-lg font-normal leading-relaxed">
          High-fidelity audio, low-latency video, and direct peer-to-peer streaming with zero account overhead.
        </p>

        {/* Minimalist interactive card */}
        <div className="mt-12 w-full max-w-sm bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          <button
            onClick={handleStartMeeting}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-sm font-medium py-3 px-5 rounded-xl transition-colors duration-150"
          >
            <Video className="w-4 h-4 text-emerald-200" />
            <span>New meeting</span>
          </button>

          <div className="relative flex items-center justify-center my-0.5">
            <div className="border-t border-zinc-100 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-zinc-400 font-medium tracking-wide uppercase">
              or
            </span>
          </div>

          <form onSubmit={handleJoinMeeting} className="flex flex-col gap-1.5">
            <div className="relative flex items-center">
              <Keyboard className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter room code or link"
                value={roomInput}
                onChange={(e) => {
                  setRoomInput(e.target.value);
                  if (inputError) setInputError("");
                }}
                className="w-full pl-10 pr-20 py-2.5 bg-zinc-50/60 border border-zinc-200 text-sm rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!roomInput.trim()}
                className="absolute right-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <span>Join</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {inputError && (
              <p className="text-xs text-rose-500 mt-1 pl-1">{inputError}</p>
            )}
          </form>
        </div>

        {/* Minimal Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-3xl w-full text-left">
          <div className="flex flex-col items-start">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-medium text-zinc-900">Direct P2P</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Browser-to-browser media exchange without middle relays for minimal latency.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-medium text-zinc-900">Secure by design</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Native WebRTC DTLS/SRTP encryption protects streams right from your device.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 mb-3">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-medium text-zinc-900">Instant access</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Share the room link or ID directly with anyone. No registration necessary.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        Veloxa &copy; {new Date().getFullYear()} — Minimalist WebRTC Collaboration
      </footer>
    </div>
  );
};

export default Home;