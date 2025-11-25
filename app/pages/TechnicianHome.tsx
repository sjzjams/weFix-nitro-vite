
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, RefreshCw, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  { OrderStatus } from '../types';
import type { Order } from '../types';
// import { OrderService } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';

const TechnicianHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async (force = false) => {
      if (force) setRefreshing(true);
      else setLoading(true);

      try {
        const { data } = [] as unknown as { data: Order[] };
        // 筛选逻辑：Pending 且 没有被分配的订单
        const poolOrders = data.filter(o => o.status === OrderStatus.PENDING && !o.technicianId);
        setAvailableOrders(poolOrders);
      } catch (e) {
          console.error(e);
      } finally {
          setLoading(false);
          setRefreshing(false);
      }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAcceptOrder = async (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    if (window.confirm('确定要接这个单吗？')) {
        if (user?.id) {
            setRefreshing(true);
            // 更新 DB 和 缓存
            // await OrderService.updateOrderStatus(orderId, OrderStatus.ACCEPTED, user.id);
            // 重新加载
            await loadOrders(true);
            navigate('/orders');
        }
    }
  };

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header */}
      <header className="bg-[#07C160] text-white p-6 rounded-b-[30px] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">接单大厅</h1>
            <p className="text-green-100 text-sm mt-1">附近有 {availableOrders.length} 个新需求等待处理</p>
          </div>
          <button 
            onClick={() => loadOrders(true)}
            disabled={refreshing}
            className={`bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors ${refreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        {/* Quick Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between">
            <div className="text-center flex-1 border-r border-white/20">
                <span className="block text-2xl font-bold">¥{user?.balance || 0}</span>
                <span className="text-xs text-green-100">今日收入</span>
            </div>
            <div className="text-center flex-1">
                <span className="block text-2xl font-bold">3</span>
                <span className="text-xs text-green-100">今日完单</span>
            </div>
        </div>
      </header>

      <div className="p-4 space-y-4 mt-2">
        <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-800">最新需求</h2>
            <span className="text-xs text-gray-400">按距离排序</span>
        </div>

        {loading && !refreshing ? (
             <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Loader2 className="animate-spin text-[#07C160] mb-2" size={24} />
                <p className="text-xs">加载中...</p>
            </div>
        ) : availableOrders.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
                <p>暂无附近订单，请稍后再试</p>
            </div>
        ) : (
            availableOrders.map((order) => (
                <div 
                    key={order.id} 
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden animate-fade-in"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className="bg-green-50 text-[#07C160] px-3 py-1 rounded-lg text-sm font-bold">
                            {order.serviceType}
                        </div>
                        <span className="text-lg font-bold text-[#FA5151]">
                            ¥{order.price || '??'}
                        </span>
                    </div>

                    <p className="text-gray-800 font-medium mb-3">{order.description}</p>

                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                            <Clock size={14} className="mr-2" />
                            {order.date}
                        </div>
                        <div className="flex items-center">
                            <MapPin size={14} className="mr-2" />
                            {order.address} <span className="text-xs ml-2 text-[#07C160]">(1.2km)</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex items-center space-x-2">
                            <img src={order.clientAvatar || 'https://picsum.photos/50'} className="w-6 h-6 rounded-full" alt="Client" />
                            <span className="text-xs text-gray-600">{order.clientName}</span>
                        </div>
                        <button 
                            onClick={(e) => handleAcceptOrder(e, order.id)}
                            className="bg-[#07C160] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-green-600 transition-colors"
                        >
                            立即抢单
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default TechnicianHome;
