import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  User, 
  ShoppingBag, 
  PieChart, 
  Info, 
  ChevronRight, 
  Zap, 
  Award,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Coffee,
  Trash2,
  Box
} from 'lucide-react';

const HamBurger = () => {
  const [activeTab, setActiveTab] = useState('market'); // market, transparency, wallet, me
  const [progress, setProgress] = useState(82.4); 
  const [isLanded, setIsLanded] = useState(false);
  const [dailyTarget] = useState(1200);

  // 模拟营业数据实时波动
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 0.2;
        if (next >= 100) {
          setIsLanded(true);
          return 100;
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 1. 顶部状态栏：强调“生存状态”
  const HeaderStatus = () => (
    <div className="bg-yellow-400 p-6 rounded-b-[2.5rem] shadow-xl border-b-4 border-blue-900 sticky top-0 z-50">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full animate-ping ${isLanded ? 'bg-green-600' : 'bg-red-600'}`}></div>
          <span className="font-black text-blue-900 text-sm tracking-widest uppercase">
            {isLanded ? "Status: 已上岸/全场狂欢" : "Status: 挣扎求生中"}
          </span>
        </div>
        <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-[10px] font-black italic">
          v1.1 极致透明版
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between mb-2 items-end">
          <div className="text-4xl font-black text-blue-900 tracking-tighter">
            {progress.toFixed(1)}<span className="text-xl">%</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-blue-800 opacity-60 uppercase">今日目标流水</p>
            <p className="text-sm font-black text-blue-900">¥{(progress * dailyTarget / 100).toFixed(0)} / ¥{dailyTarget}</p>
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="h-10 w-full bg-blue-900 rounded-2xl p-1 relative shadow-inner">
          <div 
            className="h-full bg-white rounded-xl transition-all duration-1000 ease-out flex items-center justify-center relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
            {progress > 40 && <span className="text-blue-900 font-black text-[10px] z-10">房租水电已挣够!</span>}
          </div>
          {/* 上岸线标注 */}
          <div className="absolute top-0 left-[80%] bottom-0 w-0.5 bg-red-500 z-20 flex items-center justify-center">
            <div className="bg-red-500 text-white text-[8px] px-1 absolute -top-4 rounded whitespace-nowrap font-bold uppercase">生存警戒线</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. 透明看板：精细化成本公示
  const TransparencyPage = () => (
    <div className="px-4 pb-24 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border-4 border-blue-900 rounded-3xl p-5 shadow-[6px_6px_0px_0px_rgba(30,58,138,1)]">
        <h2 className="text-xl font-black text-blue-900 mb-4 flex items-center gap-2 italic">
          <ShieldCheck /> 实时成本公示 (Daily)
        </h2>
        
        <div className="space-y-4">
          {/* 基础摊销 */}
          <div>
            <h3 className="text-[10px] font-black text-blue-900/40 uppercase mb-2 border-l-2 border-blue-900 pl-2">Fixed / 固定开支</h3>
            <div className="space-y-2">
              {[
                { label: "房租水电 (摊销)", value: "¥240", status: "100%", color: "text-green-600" },
                { label: "老板工资 (情绪抚慰)", value: "¥300", status: "62%", color: "text-orange-500" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <span className="text-xs font-bold text-gray-600">{item.label}</span>
                  <div className="text-right flex items-center gap-4">
                    <span className="font-black text-blue-900 text-xs">{item.value}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded bg-gray-100 ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 动态成本 */}
          <div>
            <h3 className="text-[10px] font-black text-blue-900/40 uppercase mb-2 border-l-2 border-blue-900 pl-2">Variable / 动态变动</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-1"><Box size={12}/> <span>包材/调料/吸管</span></div>
                <span className="font-black text-blue-900 text-xs">¥{(progress * 0.8).toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-1"><ArrowUpRight size={12}/> <span>平台抽成 (美团/饿了么)</span></div>
                <span className="font-black text-red-500 text-xs">-¥{(progress * 4.2).toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-1"><Trash2 size={12}/> <span>坏损/委屈金 (3%预留)</span></div>
                <span className="font-black text-blue-900 text-xs">¥{(progress * 0.3).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-red-50 rounded-xl border-2 border-red-500 border-dashed text-center">
          <p className="text-[10px] text-red-700 font-bold leading-tight">
            🚨 平台抽成太狠了！建议到店自提或使用本小程序下单，<br/>省下的钱 100% 转化为你的回馈金。
          </p>
        </div>
      </div>

      <div className="bg-blue-900 text-white rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <PieChart size={80} />
        </div>
        <h3 className="font-black italic mb-3 flex items-center gap-2">
            <TrendingUp size={18}/> 实时权重算法
        </h3>
        <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-black text-yellow-400">1.82<span className="text-sm">x</span></span>
            <span className="text-[10px] font-bold opacity-60 mb-2">当前下单回馈倍率</span>
        </div>
        <div className="space-y-1">
            <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="h-full bg-yellow-400 rounded-full" style={{width: '65%'}}></div>
            </div>
            <p className="text-[9px] font-bold opacity-50 uppercase tracking-tighter text-right">距离权重衰减至1.5x还差 ¥120</p>
        </div>
      </div>
    </div>
  );

  // 3. 点单集市：情绪化产品
  const MarketPage = () => (
    <div className="px-4 pb-24 animate-in fade-in duration-500">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['打工人专属', '小学生专区', '情绪解药', '利息核销'].map((cat, i) => (
          <span key={i} className={`whitespace-nowrap px-4 py-2 rounded-full border-2 border-blue-900 text-xs font-black ${i===0 ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 shadow-[2px_2px_0px_0px_rgba(30,58,138,1)]'}`}>
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "【画饼】牛堡", price: 18, cost: 13, weight: "3.0x", img: "🍔", mood: "内卷救星", platform: "平台加价 ¥4" },
          { name: "【满分】鸡堡", price: 12, cost: 9, weight: "1.5x", img: "🍗", mood: "考试必过", platform: "平台加价 ¥3" },
          { name: "【辞职】双层堡", price: 25, cost: 16, weight: "0.8x", img: "🥩", mood: "直接开摆", platform: "平台加价 ¥5" },
          { name: "【微薄】细薯", price: 7, cost: 3, weight: "1.0x", img: "🍟", mood: "穷鬼乐", platform: "平台加价 ¥2" },
        ].map((item, i) => (
          <div key={i} className="bg-white border-4 border-blue-900 rounded-3xl p-4 relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] px-2 py-1 rounded-bl-xl font-black italic">
              权重 {item.weight}
            </div>
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.img}</div>
            <h3 className="font-black text-blue-900 text-sm truncate">{item.name}</h3>
            <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold mb-3 italic">
              <Flame size={10} className="text-orange-500"/> {item.mood}
            </div>
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-lg font-black text-blue-900">¥{item.price}</span>
              </div>
              <button className="bg-yellow-400 p-2 rounded-xl border-2 border-blue-900 hover:bg-yellow-500">
                <ShoppingBag size={18} />
              </button>
            </div>
            <p className="text-[8px] text-red-400 font-black italic line-through opacity-60 leading-none">{item.platform}</p>
            <p className="text-[8px] text-green-600 font-black mt-1 uppercase leading-none">本小程序特供价</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border-4 border-blue-900 rounded-2xl p-4 overflow-hidden relative border-dashed">
         <h4 className="text-[10px] font-black text-blue-900/40 uppercase mb-2">Live Logs / 实时共建日志</h4>
         <div className="space-y-2">
            <div className="text-[10px] font-bold text-blue-900 flex justify-between">
               <span className="flex items-center gap-1"><Coffee size={10}/> 尾号8812 购买【画饼堡】</span>
               <span className="text-green-600">+¥2.4 预期回馈</span>
            </div>
            <div className="text-[10px] font-bold text-blue-900 flex justify-between opacity-50">
               <span className="flex items-center gap-1"><User size={10}/> 尾号0192 购买【细薯】</span>
               <span className="text-green-600">+¥0.8 预期回馈</span>
            </div>
         </div>
      </div>
    </div>
  );

  const WalletPage = () => (
    <div className="px-4 pb-24">
      <div className="bg-blue-900 rounded-[2.5rem] p-8 mb-6 text-white relative overflow-hidden shadow-2xl border-b-8 border-blue-950">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-yellow-400/5 rounded-full"></div>
        
        <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-2 text-center">待结回馈金额 / Pending</p>
        <h2 className="text-5xl font-black text-center mb-6">
          <span className="text-xl mr-1 italic text-yellow-400 font-normal">¥</span>12.85
        </h2>
        
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
            <p className="text-[9px] opacity-60 uppercase font-black">今日新增权重分</p>
            <p className="text-lg font-black text-green-400">4.52</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
            <p className="text-[9px] opacity-60 uppercase font-black">虚拟年化</p>
            <p className="text-lg font-black text-yellow-400">14.2%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-white border-4 border-blue-900 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-900"><ShoppingBag size={24}/></div>
          <span className="text-xs font-black italic">直接吃掉 (抵现)</span>
        </button>
        <button className="bg-white border-4 border-blue-900 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
          <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><TrendingUp size={24}/></div>
          <span className="text-xs font-black italic">存入基金 (增值)</span>
        </button>
      </div>

      <div className="bg-yellow-400 border-4 border-blue-900 p-5 rounded-3xl relative overflow-hidden">
        <h3 className="font-black text-sm mb-2 flex items-center gap-2">
            <Award size={18}/> 堡贝共建特权
        </h3>
        <p className="text-[10px] font-bold text-blue-900/70 leading-relaxed italic">
          当你在本店累计产生的“预期回馈金”超过 ¥100 时，你将自动解锁【共享老板】头衔。
          拥有对新品研发的投票权及每日流水账单的后台查看权限（Read Only）。
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen font-sans text-blue-900 pb-10">
      <HeaderStatus />
      
      <div className="mt-4">
        {activeTab === 'market' && <MarketPage />}
        {activeTab === 'transparency' && <TransparencyPage />}
        {activeTab === 'wallet' && <WalletPage />}
      </div>
      
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-4 border-blue-900 px-6 py-3 flex justify-between items-center z-50">
        {[
          { id: 'market', icon: <ShoppingBag size={20}/>, label: '集市' },
          { id: 'transparency', icon: <PieChart size={20}/>, label: '账本' },
          { id: 'wallet', icon: <Zap size={20}/>, label: '回馈' },
          { id: 'me', icon: <User size={20}/>, label: '我的' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`flex flex-col items-center transition-all ${activeTab === tab.id ? 'text-blue-900 scale-110' : 'text-gray-400'}`}
          >
            <div className={activeTab === tab.id ? 'bg-yellow-400 p-1.5 rounded-lg border-2 border-blue-900 shadow-[2px_2px_0px_0px_rgba(30,58,138,1)]' : ''}>
              {tab.icon}
            </div>
            <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HamBurger;