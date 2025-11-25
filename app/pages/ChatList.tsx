import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { NEARBY_TECHNICIANS } from '../constants';

const ChatList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-full">
        <div className="p-4 border-b border-gray-100 flex items-center">
            <button 
                onClick={() => navigate('/')} 
                className="mr-2 p-1 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">消息列表</h1>
        </div>
        <div>
            {NEARBY_TECHNICIANS.map((tech, idx) => (
                <div 
                    key={tech.id} 
                    onClick={() => navigate(`/chat/${tech.id}`)}
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer"
                >
                    <div className="relative mr-4">
                        <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-full object-cover" />
                        {tech.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#07C160] border-2 border-white rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-gray-800">{tech.name}</h3>
                            <span className="text-xs text-gray-400">10:3{idx}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate w-64">
                            {idx === 0 ? "我大概10分钟后到达。" : "请发一张故障照片给我。"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ChatList;