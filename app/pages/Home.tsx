
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Bell, ChevronRight, Star, WashingMachine, Droplets, Zap, Smartphone, Sofa, SprayCan, Key, Grid } from 'lucide-react';
import { SERVICE_CATEGORIES, NEARBY_TECHNICIANS } from '../constants';

import TechnicianHome from './TechnicianHome';
import AdminDashboard from './AdminDashboard';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (name: string) => {
    switch (name) {
      case 'washing-machine': return <WashingMachine size={24} />;
      case 'droplet': return <Droplets size={24} />;
      case 'zap': return <Zap size={24} />;
      case 'smartphone': return <Smartphone size={24} />;
      case 'sofa': return <Sofa size={24} />;
      case 'spray-can': return <SprayCan size={24} />;
      case 'key': return <Key size={24} />;
      default: return <Grid size={24} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header */}
      <header className="bg-[#07C160] text-white p-4 pb-12 rounded-b-[30px] relative shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <MapPin size={18} />
            <span className="font-medium text-sm truncate max-w-[200px]">阳光花园小区 3号楼</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex space-x-4">
            <Bell size={20} />
          </div>
        </div>
        
        <div className="mb-2">
          <h1 className="text-2xl font-bold tracking-wide">需要维修服务?</h1>
          <p className="text-green-100 text-sm">我们随时为您解决生活烦恼。</p>
        </div>

        {/* Search Bar */}
        <div className="absolute -bottom-6 left-4 right-4">
            <div className="bg-white rounded-xl shadow-lg flex items-center p-3 text-gray-500">
                <Search size={20} className="mr-2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="试试搜索 '空调维修' 或 '通马桶'" 
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
            </div>
        </div>
      </header>

      <div className="mt-10 px-4 space-y-6">
        {/* Services Grid */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-gray-800">服务分类</h2>
            <span className="text-xs text-gray-400">全部</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((service) => (
              <button 
                key={service.id} 
                onClick={() => navigate('/repair', { state: { category: service.name } })}
                className="flex flex-col items-center space-y-2 active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${service.color}`}>
                    {getIcon(service.icon)}
                </div>
                <span className="text-xs text-gray-600 font-medium">{service.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg flex justify-between items-center cursor-pointer hover:opacity-90 transition-opacity">
            <div>
                <h3 className="font-bold text-lg">新人特惠</h3>
                <p className="text-xs text-indigo-100 mt-1">首单维修享半价优惠！</p>
            </div>
            <div className="bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                立即领取
            </div>
        </section>

        {/* Nearby Technicians */}
        <section className="pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-gray-800">附近师傅</h2>
            <span className="text-xs text-gray-400">查看地图</span>
          </div>
          <div className="space-y-3">
            {NEARBY_TECHNICIANS.map((tech) => (
              <div key={tech.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center space-x-3">
                <div className="relative">
                    <img src={tech.avatar} alt={tech.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                    {tech.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#07C160] border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{tech.name}</h3>
                        <span className="text-xs text-gray-400">{tech.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs font-bold text-gray-700">{tech.rating}</span>
                        <span className="text-[10px] text-gray-400">({tech.ordersCompleted} 单)</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                        {tech.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
                <button 
                  onClick={() => navigate('/repair', { state: { technicianId: tech.id } })}
                  className="bg-[#07C160] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm active:bg-green-700"
                >
                    预约
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const Home: React.FC = () => {
    // const { user } = useAuth();

    // if (!user) return <UserHome />; // Fallback or could redirect to login
    
    // if (user.role === UserRole.TECHNICIAN) {
    //     return <TechnicianHome />;
    // }
    
    // if (user.role === UserRole.ADMIN) {
    //     return <AdminDashboard />;
    // }

    return <UserHome />;
};

export default Home;
