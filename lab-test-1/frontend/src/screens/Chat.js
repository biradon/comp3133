import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Logout from '../components/Logout';

const socket = io("http://localhost:5000");

const Chat = () => {
  const { room } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load messages from localStorage (if any)
    const storedMessages = JSON.parse(localStorage.getItem(`messages-${room}`)) || [];
    setMessages(storedMessages);

    // Join the room on mount
    socket.emit("join-room", { room });

    // Listen for new messages in the room
    socket.on("user-chat", (data) => {
      const updatedMessages = [...messages, data];
      setMessages(updatedMessages);

      // Store updated messages in localStorage
      localStorage.setItem(`messages-${room}`, JSON.stringify(updatedMessages));
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.emit("leave-room", { room });
      socket.off("user-chat");
    };
  }, [room, messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    if (message.trim() && username) {
      socket.emit("on-chat", { message, room, self: true, username });
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <Logout />
        <div className="text-center py-3 text-lg font-semibold">
          Chat in the {room} room
        </div>
        <div className="h-80 overflow-y-auto p-4 bg-gray-200">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg max-w-[80%] break-words ${
                  msg.self ? "bg-blue-500 self-end ml-auto" : "bg-green-500 self-start"
                }`}
              >
                <strong>{msg.username}</strong>: {msg.message}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={sendMessage} className="flex p-3 border-t">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-full outline-none"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
