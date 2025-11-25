import { setupApp } from "./app";
import { setupDatabaseExplorer } from "./database-explorer";
import React from 'react';
import ReactDOM from 'react-dom/client';
import ServerTime from './components/ServerTime';

const outlet = document.querySelector('#router-outlet')!;

// 创建并添加导航链接
const navContainer = document.createElement('nav');
const dbLink = document.createElement('a');
dbLink.href = '#database-explorer';
dbLink.textContent = 'Go to Database Explorer';
dbLink.style.marginRight = '10px';
navContainer.appendChild(dbLink);

const reactLink = document.createElement('a');
reactLink.href = '#react-example';
reactLink.textContent = 'Go to React Example';
navContainer.appendChild(reactLink);

// 将导航插入到 outlet 之前
outlet.parentElement!.insertBefore(navContainer, outlet);


/**
 * 根据URL的hash值，动态渲染不同的页面组件。
 */
function router() {
  outlet.innerHTML = ''; // 只清空 outlet 容器

  switch (window.location.hash) {
    case '#database-explorer':
      const dbExplorerContainer = document.createElement('div');
      dbExplorerContainer.id = 'database-explorer';
      dbExplorerContainer.className = 'card';
      outlet.appendChild(dbExplorerContainer);
      setupDatabaseExplorer(dbExplorerContainer);
      break;

    case '#react-example':
      const reactContainer = document.createElement('div');
      reactContainer.id = 'react-app';
      reactContainer.className = 'card';
      outlet.appendChild(reactContainer);
      const root = ReactDOM.createRoot(reactContainer);
      root.render(
        <React.StrictMode>
          <ServerTime />
        </React.StrictMode>
      );
      break;

    default:
      const appContainer = document.createElement('div');
      appContainer.id = 'app';
      appContainer.className = 'card';
      outlet.appendChild(appContainer);
      setupApp(appContainer);
      break;
  }
}

window.addEventListener('hashchange', router);

// 初始路由
router();
