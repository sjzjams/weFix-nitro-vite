import React, { useState, useEffect } from 'react';
import { OrderStatus, UserRole } from '../types';
import type { Order } from '../types';
import { Clock, CheckCircle, AlertCircle, ArrowRight, MapPin, Phone, MessageSquare, Database, Zap, Loader2, Star, CreditCard, HardDrive } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { OrderService } from '../services/orderService';
import { MOCK_ORDERS, NEARBY_TECHNICIANS } from '../constants';

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Processing' | 'Completed'>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'CACHE' | 'DB' | 'LOCAL' | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Track which order is being acted upon
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  // Load Data
  const fetchOrders = async () => {
    setLoading(true);
    const start = performance.now();
    try {
    //   const { data, source } = MOCK_ORDERS as unknown as { source: 'LOCAL' };
      setOrders(MOCK_ORDERS);
      setDataSource('LOCAL');
      const duration = performance.now() - start;
      console.log(`[UI] Data loaded from ${'LOCAL'} in ${duration.toFixed(0)}ms`);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle new order signal
  useEffect(() => {
    if (location.state?.newOrder) {
       fetchOrders(); // Refresh list if redirected from new order
       // Clear state to prevent loop
       window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    if (user?.role === UserRole.TECHNICIAN) {
         // Technician logic: Show orders assigned to them
         if (!order.technicianId && user.id !== order.technicianId) return false; 
         if (order.technicianId !== user.id) return false;
    }
    // User sees all orders for demo purposes

    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return order.status === OrderStatus.PENDING;
    if (activeTab === 'Processing') return order.status === OrderStatus.PROCESSING || order.status === OrderStatus.ACCEPTED;
    if (activeTab === 'Completed') return order.status === OrderStatus.COMPLETED;
    return true;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-orange-100 text-orange-600';
      case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-600';
      case OrderStatus.ACCEPTED: return 'bg-blue-100 text-blue-600';
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-600';
      case OrderStatus.CANCELLED: return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleStatusUpdate = async (e: React.MouseEvent, id: string, newStatus: OrderStatus) => {
      e.stopPropagation();
      setActionLoading(id);
    //   await OrderService.updateOrderStatus(id, newStatus);
      await fetchOrders();
      setActionLoading(null);
  };

  const handlePay = async (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (window.confirm('确认支付订单费用吗？')) {
          setActionLoading(id);
        //   await OrderService.payOrder(id);
          await fetchOrders();
          setActionLoading(null);
          alert('支付成功！');
      }
  };

  const handleRate = async (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const ratingStr = window.prompt('请评分 (1-5):', '5');
      const comment = window.prompt('请输入评价内容:', '服务很棒！');
      
      if (ratingStr && comment) {
          setActionLoading(id);
        //   await OrderService.rateOrder(id, parseInt(ratingStr), comment);
          await fetchOrders();
          setActionLoading(null);
          alert('评价提交成功！');
      }
  };

  const tabLabels: Record<string, string> = {
      'All': '全部',
      'Pending': '待服务',
      'Processing': '进行中',
      'Completed': '已完成'
  };

  const getSourceBadge = () => {
      if (dataSource === 'CACHE') return { color: 'bg-purple-100 text-purple-600', icon: <Zap size={12} className="mr-1" />, text: 'Redis Hit' };
      if (dataSource === 'DB') return { color: 'bg-blue-100 text-blue-600', icon: <Database size={12} className="mr-1" />, text: 'SQLite' };
      return { color: 'bg-gray-100 text-gray-600', icon: <HardDrive size={12} className="mr-1" />, text: 'Local Mode' };
  };

  const badge = getSourceBadge();

  return (
    <div className="bg-gray-50 min-h-full flex flex-col pb-20">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="p-4 pb-0 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {user?.role === UserRole.TECHNICIAN ? '我的任务' : '我的订单'}
            </h1>
            
            {!loading && dataSource && (
                <div className={`flex items-center px-2 py-1 rounded text-xs font-bold animate-fade-in ${badge.color}`}>
                    {badge.icon}
                    {badge.text}
                </div>
            )}
        </div>
        <div className="flex px-4 space-x-6 overflow-x-auto scrollbar-hide border-b border-gray-100">
            {['All', 'Pending', 'Processing', 'Completed'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab ? 'text-[#07C160]' : 'text-gray-500'
                }`}
            >
                {tabLabels[tab]}
                {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07C160] rounded-t-full" />
                )}
            </button>
            ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading && !actionLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin text-[#07C160] mb-2" size={32} />
                <p className="text-xs">正在同步数据...</p>
            </div>
        ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Clock size={40} />
                </div>
                <p>暂无相关订单</p>
            </div>
        ) : (
            filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/chat/${order.technicianId || 'sys'}`)}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-800 text-sm">{order.serviceType}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>
                
                <div className="flex space-x-3 mb-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/200?random=${order.id}`} alt="Service" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{order.description}</p>
                        <div className="flex items-center text-xs text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {order.date}
                        </div>
                         <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin size={12} className="mr-1" />
                            <span className="truncate max-w-[180px]">{order.address}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <div className="flex items-center">
                         {user?.role === UserRole.TECHNICIAN ? (
                             <div className="flex items-center space-x-2">
                                <img src={order.clientAvatar || 'https://picsum.photos/50'} className="w-6 h-6 rounded-full" alt="Client" />
                                <span className="text-xs font-medium text-gray-700">{order.clientName || '客户'}</span>
                             </div>
                         ) : (
                             order.technician ? (
                                <div className="flex items-center space-x-2">
                                    <img src={order.technician.avatar} className="w-6 h-6 rounded-full" alt="Tech" />
                                    <span className="text-xs font-medium text-gray-700">{order.technician.name}</span>
                                </div>
                             ) : (
                                <div className="flex items-center space-x-2">
                                     <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                     <span className="text-xs text-gray-400">等待派单...</span>
                                </div>
                             )
                         )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2 items-center">
                        {actionLoading === order.id ? (
                            <Loader2 className="animate-spin text-[#07C160]" size={18} />
                        ) : user?.role === UserRole.TECHNICIAN ? (
                            <>
                                {order.status === OrderStatus.ACCEPTED && (
                                    <button 
                                        onClick={(e) => handleStatusUpdate(e, order.id, OrderStatus.PROCESSING)}
                                        className="px-3 py-1.5 bg-[#07C160] text-white rounded-lg text-xs font-medium"
                                    >
                                        开始服务
                                    </button>
                                )}
                                {order.status === OrderStatus.PROCESSING && (
                                    <button 
                                        onClick={(e) => handleStatusUpdate(e, order.id, OrderStatus.COMPLETED)}
                                        className="px-3 py-1.5 bg-[#07C160] text-white rounded-lg text-xs font-medium"
                                    >
                                        完成订单
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                {order.status === OrderStatus.COMPLETED && (
                                    <>
                                        {/* Rating Button */}
                                        {!order.rating ? (
                                            <button 
                                                onClick={(e) => handleRate(e, order.id)}
                                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 flex items-center"
                                            >
                                                <Star size={12} className="mr-1" /> 评价
                                            </button>
                                        ) : (
                                            <div className="flex items-center text-yellow-400 text-xs">
                                                <Star size={12} fill="currentColor" className="mr-1"/>
                                                <span className="font-bold text-gray-500">{order.rating}分</span>
                                            </div>
                                        )}

                                        {/* Pay Button */}
                                        {order.price && !order.isPaid && (
                                            <button 
                                                onClick={(e) => handlePay(e, order.id)}
                                                className="px-3 py-1.5 bg-[#07C160] text-white rounded-lg text-xs font-medium flex items-center"
                                            >
                                                <CreditCard size={12} className="mr-1" /> 支付
                                            </button>
                                        )}
                                        {order.isPaid && (
                                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">已支付</span>
                                        )}
                                    </>
                                )}
                                {(order.status === OrderStatus.PENDING || order.status === OrderStatus.ACCEPTED) && (
                                     <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-500">取消</button>
                                )}
                            </>
                        )}
                        <button className="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
                            <Phone size={14} />
                        </button>
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Orders;