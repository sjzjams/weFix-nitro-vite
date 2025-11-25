
import React from 'react';
import { Settings, CreditCard, Headphones, MapPin, Star, ChevronRight, Wallet, Gift, LogOut, ShieldCheck, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header Profile Card */}
      <div className="bg-[#07C160] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-md relative">
         <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white p-0.5">
                <img src={user.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <div className="flex items-center mt-1">
                    <span className="text-green-100 text-sm mr-2">
                        {user.role === UserRole.USER ? '普通用户' : user.role === UserRole.TECHNICIAN ? '认证师傅' : '管理员'}
                    </span>
                    {user.role === UserRole.TECHNICIAN && (
                        <span className="bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded font-bold">已认证</span>
                    )}
                </div>
            </div>
            <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Settings size={20} />
            </button>
         </div>
      </div>

      {/* Stats Card */}
      <div className="px-4">
        <div className="bg-white rounded-xl shadow-lg p-4 flex justify-around items-center">
            {user.role === UserRole.TECHNICIAN ? (
                <>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">¥{user.balance}</span>
                        <span className="text-xs text-gray-500 mt-1">可提现</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">4.9</span>
                        <span className="text-xs text-gray-500 mt-1">服务分</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">128</span>
                        <span className="text-xs text-gray-500 mt-1">总接单</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">1500</span>
                        <span className="text-xs text-gray-500 mt-1">积分</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">3</span>
                        <span className="text-xs text-gray-500 mt-1">优惠券</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-gray-800">¥{user.balance}</span>
                        <span className="text-xs text-gray-500 mt-1">余额</span>
                    </div>
                </>
            )}
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 mt-6 space-y-3">
        
        {user.role === UserRole.TECHNICIAN && (
            <section className="bg-white rounded-xl overflow-hidden shadow-sm">
                <MenuItem icon={Wallet} label="我的钱包" color="text-blue-500" />
                <div className="h-px bg-gray-50 mx-14" />
                <MenuItem icon={ShieldCheck} label="资质认证" color="text-orange-500" rightText="已通过" />
                <div className="h-px bg-gray-50 mx-14" />
                <MenuItem icon={Settings} label="服务设置" color="text-gray-600" />
            </section>
        )}

        {user.role === UserRole.USER && (
            <section className="bg-white rounded-xl overflow-hidden shadow-sm">
                <MenuItem icon={Wallet} label="我的钱包" color="text-blue-500" />
                <div className="h-px bg-gray-50 mx-14" />
                <MenuItem icon={MapPin} label="地址管理" color="text-orange-500" />
                <div className="h-px bg-gray-50 mx-14" />
                <MenuItem icon={Gift} label="邀请好友" color="text-purple-500" rightText="赚取 ¥10" />
            </section>
        )}

        {user.role === UserRole.ADMIN && (
             <section className="bg-white rounded-xl overflow-hidden shadow-sm">
                <MenuItem icon={ShieldCheck} label="用户管理" color="text-blue-500" />
                <div className="h-px bg-gray-50 mx-14" />
                <MenuItem icon={FileText} label="订单监控" color="text-orange-500" />
            </section>
        )}

        <section className="bg-white rounded-xl overflow-hidden shadow-sm">
            {user.role !== UserRole.ADMIN && (
                <>
                    <MenuItem icon={Star} label="我的评价" color="text-yellow-500" />
                    <div className="h-px bg-gray-50 mx-14" />
                </>
            )}
            <MenuItem icon={Headphones} label="客服中心" color="text-[#07C160]" />
        </section>

        <button 
            onClick={handleLogout}
            className="w-full py-3 text-red-500 text-sm font-medium bg-white rounded-xl shadow-sm mt-4 flex items-center justify-center space-x-2"
        >
            <LogOut size={18} />
            <span>退出登录</span>
        </button>
        
        <div className="text-center mt-4">
             <button onClick={() => navigate('/login')} className="text-xs text-gray-400 underline">切换角色演示</button>
        </div>

      </div>
    </div>
  );
};

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    color: string;
    rightText?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, color, rightText }) => (
    <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors">
        <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 ${color}`}>
            <Icon size={18} />
        </div>
        <span className="text-sm font-medium text-gray-700 flex-1 text-left">{label}</span>
        {rightText && <span className="text-xs text-[#FA5151] mr-2 font-medium">{rightText}</span>}
        <ChevronRight size={16} className="text-gray-300" />
    </button>
);

export default Profile;
