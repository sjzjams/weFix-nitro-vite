
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { User, Wrench, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07C160] to-[#059669] flex flex-col items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench size={40} className="text-[#07C160]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">WeFix 报修平台</h1>
          <p className="text-gray-500 mt-2 text-sm">请选择您的角色进行登录</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin(UserRole.USER)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-gray-100 hover:border-[#07C160] hover:bg-green-50 transition-all group"
          >
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4 group-hover:scale-110 transition-transform">
              <User size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">我是用户</h3>
              <p className="text-xs text-gray-400">发布需求，寻找师傅</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.TECHNICIAN)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-gray-100 hover:border-[#07C160] hover:bg-green-50 transition-all group"
          >
            <div className="bg-orange-100 p-3 rounded-full text-orange-600 mr-4 group-hover:scale-110 transition-transform">
              <Wrench size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">我是维修师傅</h3>
              <p className="text-xs text-gray-400">接单赚钱，管理订单</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full flex items-center p-4 rounded-xl border-2 border-gray-100 hover:border-[#07C160] hover:bg-green-50 transition-all group"
          >
            <div className="bg-purple-100 p-3 rounded-full text-purple-600 mr-4 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">我是管理员</h3>
              <p className="text-xs text-gray-400">后台管理，数据监控</p>
            </div>
          </button>
        </div>

        <div className="text-center">
            <p className="text-xs text-gray-400">点击即代表同意《用户服务协议》</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
