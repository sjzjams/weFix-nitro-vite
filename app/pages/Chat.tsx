import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Image as ImageIcon,
  Mic,
  Send,
  Phone,
} from "lucide-react";
import type { ChatMessage } from "../types";
import { NEARBY_TECHNICIANS } from "../constants";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Mock technician based on ID or default
  const tech = NEARBY_TECHNICIANS.find((t) => t.id === id) ||
    NEARBY_TECHNICIANS[0] || {
      id: "default",
      name: "默认技师",
      avatar: "/default-avatar.png",
    };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: "tech",
      text: `你好！我是${tech.name}。请问有什么可以帮您？`,
      timestamp: Date.now() - 100000,
      isSelf: false,
      type: "text",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "me",
      text: input,
      timestamp: Date.now(),
      isSelf: true,
      type: "text",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: "tech",
        text: "好的，我已收到您的信息。稍等我确认一下行程。",
        timestamp: Date.now(),
        isSelf: false,
        type: "text",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-1 mr-2">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-sm">{tech.name}</h1>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#07C160] rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">在线</span>
            </div>
          </div>
        </div>
        <button className="p-2 bg-green-50 rounded-full text-[#07C160]">
          <Phone size={18} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
            今天 10:30
          </span>
        </div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
          >
            {!msg.isSelf && (
              <img
                src={tech.avatar}
                className="w-8 h-8 rounded-full mr-2 self-end mb-1"
                alt="tech"
              />
            )}
            <div
              className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                msg.isSelf
                  ? "bg-[#07C160] text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-200 pb-safe">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 p-2 hover:bg-gray-100 rounded-full">
            <Mic size={20} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="请输入消息..."
              className="bg-transparent flex-1 outline-none text-sm"
            />
          </div>
          <button className="text-gray-500 p-2 hover:bg-gray-100 rounded-full">
            <ImageIcon size={20} />
          </button>
          {input.trim() && (
            <button
              onClick={handleSend}
              className="bg-[#07C160] text-white p-2 rounded-full animate-fade-in"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
