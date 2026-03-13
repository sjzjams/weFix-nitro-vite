import React from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { setupApp } from "./app";
import { setupDatabaseExplorer } from "./database-explorer";
import ServerTime from "./components/ServerTime";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequestRepair from "./pages/RequestRepair";
import Orders from "./pages/Orders";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HamBurger from "./pages/HamBurger";

/**
 * 一个React组件，用于包装并运行那些期望直接操作DOM元素的旧有setup函数。
 * @param setup - 一个函数，接收一个HTMLElement作为参数来初始化旧有模块。
 * @param id - 将要创建的div元素的ID。
 * @returns 返回一个React元素，该元素在挂载后会执行setup函数。
 */
const LegacyWrapper: React.FC<{
  setup: (el: HTMLElement) => void;
  id: string;
}> = ({ setup, id }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      // 清空容器以防setup函数不是幂等的
      ref.current.innerHTML = "";
      setup(ref.current);
    }

    // 如果setup函数返回一个清理函数，可以在这里返回它
    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [setup]); // 当setup函数变化时重新运行effect

  return <div id={id} className="card" ref={ref} />;
};

/**
 * 应用程序的主组件，包含了导航和路由配置。
 */
const AppRoutes = () => {
  return (
    <Layout>
      {/* <Router>
        <nav>
          <Link to="/database-explorer" style={{ marginRight: "10px" }}>
            Go to Database Explorer
          </Link>
          <Link to="/react-example" style={{ marginRight: "10px" }}>
            Go to React Example
          </Link>
          <Link to="/">Go to App</Link>
        </nav>
        <Routes>
          <Route
            path="/database-explorer"
            element={
              <LegacyWrapper
                setup={setupDatabaseExplorer}
                id="database-explorer"
              />
            }
          />
          <Route
            path="/react-example"
            element={
              <div id="react-app" className="card">
                <ServerTime />
              </div>
            }
          />
          <Route
            path="/"
            element={<LegacyWrapper setup={setupApp} id="app" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router> */}
      <Routes>
        {/* <Route
          path="/database-explorer"
          element={
            <LegacyWrapper
              setup={setupDatabaseExplorer}
              id="database-explorer"
            />
          }
        />
        <Route
          path="/react-example"
          element={
            <div id="react-app" className="card">
              <ServerTime />
            </div>
          }
        />
        <Route path="/" element={<LegacyWrapper setup={setupApp} id="app" />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route
            path="/database-explorer"
            element={
              <LegacyWrapper
                setup={setupDatabaseExplorer}
                id="database-explorer"
              />
            }
          />
          <Route
            path="/react-example"
            element={
              <div id="react-app" className="card">
                <ServerTime />
              </div>
            }
          />
        <Route path="/hamburger" element={<HamBurger />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/repair" element={<RequestRepair />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/chat-list" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const outlet = document.querySelector("#root")!;
const root = ReactDOM.createRoot(outlet);

// 渲染主应用组件
root.render(
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);
// const App: React.FC = () => {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// };

// export default App;
