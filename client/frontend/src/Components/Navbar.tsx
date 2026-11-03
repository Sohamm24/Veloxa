import React from "react";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-zinc-900 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 transition-colors group-hover:border-zinc-300">
            <Video className="w-4 h-4" />
          </div>
          <span className="font-semibold text-base tracking-tight text-zinc-900">
            Veloxa
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/60 text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-medium tracking-tight">P2P Encrypted</span>
          </div>
        </div>
      </div>
    </header>
  );
};
