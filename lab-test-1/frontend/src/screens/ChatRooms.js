import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatRooms() {
  const [rooms] = useState(["Naruto", "Dragonball", "Attack on Titan"]);
  const navigate = useNavigate();

  const joinRoom = (room) => {
    navigate(`/chat/${room}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Choose a Chat Room</h1>
      <div className="grid gap-4">
        {rooms.map((room) => (
          <button
            key={room}
            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => joinRoom(room)} // Pass room to URL
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}
