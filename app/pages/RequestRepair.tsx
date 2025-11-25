
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Image as ImageIcon, Mic, X } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';
// import { OrderService } from '../services/orderService';
import  { OrderStatus } from '../types';
import type { Order } from '../types';
import { useAuth } from '../contexts/AuthContext';

const RequestRepair: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State initialization
  const [serviceType, setServiceType] = useState(location.state?.category || '');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('阳光花园 3号楼 402室');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceType || !description || !address) return;
    
    setIsSubmitting(true);

    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        serviceType,
        description,
        address,
        status: OrderStatus.PENDING,
        date: new Date().toLocaleString(),
        images,
        clientName: user?.name || '匿名用户',
        clientAvatar: user?.avatar,
        userId: user?.id,
    };

    try {
        // await OrderService.createOrder(newOrder);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/orders', { state: { newOrder: true } });
        }, 500); // Small UI delay
    } catch (error) {
        console.error("Failed to create order", error);
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-gray-800 mr-8">在线报修</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 p-5 space-y-6 pb-24">
        
        {/* Service Type */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">维修类型 <span className="text-[#FA5151]">*</span></label>
          <select 
            value={serviceType} 
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-[#07C160] transition-colors appearance-none"
          >
            <option value="" disabled>请选择服务类型</option>
            {SERVICE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">问题描述 <span className="text-[#FA5151]">*</span></label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述故障情况（如：厨房水龙头漏水）..."
              className="w-full p-3 h-32 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-[#07C160] resize-none text-sm"
            />
            <button type="button" className="absolute bottom-3 right-3 text-gray-400 hover:text-[#07C160]">
                <Mic size={20} />
            </button>
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">照片/视频 (可选)</label>
            <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                        <img src={img} alt="Upload" className="w-full h-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#07C160] hover:text-[#07C160] transition-colors"
                >
                    <ImageIcon size={24} />
                    <span className="text-[10px] mt-1">添加</span>
                </button>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
            />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">服务地址 <span className="text-[#FA5151]">*</span></label>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
            <MapPin size={20} className="text-[#07C160] mr-3" />
            <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">预约时间</label>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
            <Calendar size={20} className="text-[#07C160] mr-3" />
            <input 
                type="datetime-local"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
              <input type="checkbox" id="urgent" className="accent-[#07C160] w-4 h-4" />
              <label htmlFor="urgent" className="text-sm text-[#FA5151] font-medium">加急服务 (+20%)</label>
          </div>
        </div>

      </form>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          disabled={!serviceType || !address || !description || isSubmitting}
          className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
            (!serviceType || !address || !description) 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-[#07C160] hover:bg-green-600'
          }`}
        >
          {isSubmitting ? '提交中...' : '立即报修'}
        </button>
      </div>
    </div>
  );
};

export default RequestRepair;
