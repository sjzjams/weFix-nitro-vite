import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  MessageSquare,
  User,
  PlusCircle,
  Briefcase,
  LayoutDashboard,
  Search,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNav =
    location.pathname === "/repair" ||
    location.pathname.startsWith("/chat") ||
    location.pathname === "/login";

  // Define Nav Items based on Role
  //   const getNavItems = () => {
  //     if (!user || user.role === UserRole.USER) {
  //         return [
  //             { icon: Home, label: '首页', path: '/' },
  //             { icon: FileText, label: '订单', path: '/orders' },
  //             { icon: PlusCircle, label: '报修', path: '/repair', isSpecial: true },
  //             { icon: MessageSquare, label: '消息', path: '/chat-list' },
  //             { icon: User, label: '我的', path: '/profile' },
  //         ];
  //     }

  //     if (user.role === UserRole.TECHNICIAN) {
  //         return [
  //             { icon: Search, label: '接单', path: '/' }, // Tech Home (Job Pool)
  //             { icon: Briefcase, label: '任务', path: '/orders' }, // My Orders
  //             { icon: MessageSquare, label: '消息', path: '/chat-list' },
  //             { icon: User, label: '我的', path: '/profile' },
  //         ];
  //     }

  //     if (user.role === UserRole.ADMIN) {
  //         return [
  //             { icon: LayoutDashboard, label: '概览', path: '/' },
  //             { icon: User, label: '管理', path: '/profile' },
  //         ];
  //     }

  //     return [];
  //   };
  const getNavItems = () => {
    return [
      { icon: Home, label: "首页", path: "/" },
      { icon: FileText, label: "订单", path: "/orders" },
      { icon: PlusCircle, label: "报修", path: "/repair", isSpecial: true },
      { icon: MessageSquare, label: "消息", path: "/chat-list" },
      { icon: User, label: "我的", path: "/profile" },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-slate-800 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>

      {/* Bottom Navigation */}
      {/* {!hideNav && (
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md z-50 pb-safe">
          <div className={`flex justify-around items-center h-16 px-2`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const colorClass = isActive ? "text-[#07C160]" : "text-gray-400";

              if (item.isSpecial) {
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center justify-center -mt-6"
                  >
                    <div className="bg-[#07C160] text-white p-3 rounded-full shadow-lg border-4 border-gray-50">
                      <item.icon size={28} />
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        isActive
                          ? "text-[#07C160] font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${colorClass}`}
                >
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )} */}
    </div>
  );
};

export default Layout;
