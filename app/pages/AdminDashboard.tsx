
import React from 'react';
import { MOCK_ADMIN_STATS } from '../constants';
import { Users, ShoppingBag, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-full p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">管理控制台</h1>
        <p className="text-sm text-gray-500">欢迎回来，管理员</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <Users size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{MOCK_ADMIN_STATS.totalUsers}</div>
            <div className="text-xs text-gray-500">总用户数</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-2">
                <ShoppingBag size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{MOCK_ADMIN_STATS.activeOrders}</div>
            <div className="text-xs text-gray-500">进行中订单</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                <DollarSign size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">¥{MOCK_ADMIN_STATS.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500">平台总流水</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center text-red-600 mb-2">
                <AlertCircle size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{MOCK_ADMIN_STATS.pendingComplaints}</div>
            <div className="text-xs text-gray-500">待处理投诉</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">近7日订单趋势</h3>
            <TrendingUp size={16} className="text-green-500" />
        </div>
        <div className="flex items-end space-x-2 h-32 pt-4">
            {[30, 45, 35, 60, 50, 70, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-green-100 rounded-t-lg relative group">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-[#07C160] rounded-t-lg transition-all"
                        style={{ height: `${h}%` }}
                    ></div>
                </div>
            ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>周一</span>
            <span>周日</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-800">待审核师傅</h3>
        </div>
        {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                        <div className="font-medium text-sm">申请人 #{i}</div>
                        <div className="text-xs text-gray-500">申请类型: 水电维修</div>
                    </div>
                </div>
                <button className="text-xs bg-[#07C160] text-white px-3 py-1 rounded-md">审核</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
