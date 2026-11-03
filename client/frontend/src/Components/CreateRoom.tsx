import React, { useContext } from "react";
import { Video } from "lucide-react";
import { SocketContext } from "../context/SocketContext";

interface CreateRoomProps {
  className?: string;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ className = "" }) => {
  const socketContext = useContext(SocketContext);

  const initRoom = () => {
    if (socketContext?.createRoom) {
      socketContext.createRoom();
    }
  };

  return (
    <button
      onClick={initRoom}
      className={`inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors duration-150 ${className}`}
    >
      <Video className="w-4 h-4 text-emerald-200" />
      <span>New Meeting</span>
    </button>
  );
};

export default CreateRoom;