# Q&A 记录

## Q1: 为什么引入路由后页面样式丢失了？

**问题描述:**
在 `main.ts` 中引入 hash 路由逻辑后，原有的 Logo、标题等元素的样式全部消失。

**原因分析:**
路由函数在每次切换时会执行 `mainContainer.innerHTML = ''`，这清空了 `<main>` 标签下的所有内容，包括写在 `index.html` 中的静态 Logo 和标题元素。CSS 样式虽然被加载，但找不到可以应用的 HTML 元素，因此样式失效。

**解决方案:**
1.  在 `index.html` 中，将静态内容（Logo、标题）和动态内容区域分离。创建一个专门的 `<div id="router-outlet"></div>` 作为动态内容的“插座”。
2.  修改 `main.tsx` 中的路由函数，让它只清空和操作 `#router-outlet` 元素，而不是整个 `<main>` 元素。这样就保留了静态部分和它们的样式。

---

## Q2: 为什么 IDE 提示“尚未设置 ‘--jsx’”错误，但程序能正常运行？

**问题描述:**
在 `.tsx` 文件中使用 JSX 语法（如 `<MyComponent />`）时，IDE (如 VS Code) 会显示红色波浪线和错误提示，但 `npm run dev` 启动的应用功能完全正常。

**原因分析:**
这是因为项目的构建工具和 IDE 的代码检查器配置不同步导致的：
- **Vite (构建工具):** 通过 `@vitejs/plugin-react` 插件，Vite 知道如何处理和编译 JSX 语法，所以程序可以成功运行。
- **IDE (TypeScript Language Server):** IDE 内置的 TypeScript 检查服务读取的是 `tsconfig.json` 文件。如果该文件中没有明确配置 `jsx` 选项，它就不知道如何解析 JSX 语法，因此会报错。

**解决方案:**
在 `tsconfig.json` 文件的 `compilerOptions` 对象中，添加 `"jsx": "react-jsx"` 选项。这会告诉 IDE 的 TypeScript 服务，本项目使用 React 17+ 的新版 JSX 转换规则，从而消除错误提示。

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx"
    // ... 其他选项
  }
}
```

---

## Q3: 为什么调用 `setupApp` 时出现类型错误 “HTMLDivElement”不能赋给“HTMLButtonElement”？

**问题描述:**
在 `main.tsx` 中，调用 `setupApp(appContainer)` 时，TypeScript 报错，因为 `appContainer` 是一个 `div` 元素，而 `setupApp` 函数期望接收一个 `button` 元素。

**原因分析:**
`setupApp` 函数的原始设计是直接操作一个传入的按钮。但在路由改造后，我们为每个页面创建的是一个通用的 `div` 容器，导致传入的元素类型与函数期望的参数类型不匹配。

**解决方案:**
重构 `setupApp` 函数，使其更具通用性和封装性：
1.  修改 `setupApp` 的参数类型，使其接受一个通用的 `HTMLElement` 作为容器。
2.  在函数内部创建它自己需要的 `button` 元素，并将所有事件监听和逻辑都应用在这个内部创建的按钮上。
3.  最后将创建好的按钮 append 到传入的容器中。这样，`setupApp` 就不再依赖于外部传入特定类型的元素，解决了类型错误，也提升了代码的健壮性。

---

## Q4: Error: Cannot find module '.prisma/client/default' 解决问题

**问题描述:**
在使用 Prisma ORM 时出现模块找不到错误，提示无法找到 `.prisma/client/default` 模块。

**原因分析:**
此错误通常是由于 Prisma Client 未正确生成或编译导致的，常见于项目构建或开发环境配置不当的情况。

**解决方案:**

1.  **重新生成 Prisma Client**
    ```bash
    npx prisma generate
    ```

2.  **检查并安装必要依赖**
    ```bash
    npm install @prisma/client
    # 或
    yarn add @prisma/client
    ```

3.  **清理并重新构建项目**
    ```bash
    rm -rf node_modules .prisma
    npm install
    npx prisma generate
    npm run build
    ```

4.  **检查 [schema.prisma](file://d:/weappgroup/huasanJD/api/prisma/schema.prisma) 配置**
    确保 `prisma/schema.prisma` 文件中的 `generator` 配置正确：
    ```prisma
    generator client {
      provider = "prisma-client-js"
    }
    ```

5.  **验证导入路径**
    在代码中正确导入 `PrismaClient`：
    ```typescript
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()
    ```

---

## Q5: 如何将手动实现的 hash 路由重构为 React Router 的 `<Routes>` 方式？

**问题描述:**
在 `app/main.tsx` 中，路由是通过监听 `hashchange` 事件和 `switch` 语句手动实现的。如何将其重构为使用 `react-router-dom` 的声明式 `<Routes>` 写法？

**原因分析:**
手动路由实现存在以下问题：
- **命令式 DOM 操作:** 直接使用 `innerHTML` 和 `createElement`，这在 React 中是不推荐的。
- **可维护性差:** 随着路由增多，`switch` 语句会变得非常复杂。
- **功能受限:** 难以实现嵌套路由、路由参数等高级功能。

**解决方案:**
采用 `react-router-dom` 进行全面的声明式路由重构：
1.  **移除旧逻辑:** 删除手动的 `router()` 函数和 `hashchange` 事件监听器。
2.  **创建主应用组件 `App`:** 该组件将包含 `<Router>`、`<nav>` 导航链接和 `<Routes>` 路由配置。
3.  **使用 `<Link>` 组件:** 将原有的 `<a>` 标签替换为 React Router 的 `<Link>` 组件，以实现无页面刷新的客户端路由。
4.  **定义路由规则:** 使用 `<Routes>` 和 `<Route>` 组件来清晰地定义路径和对应组件的映射关系。
5.  **创建 `LegacyWrapper` 组件:** 为了兼容现有的、直接操作 DOM 的 `setupApp` 和 `setupDatabaseExplorer` 函数，创建了一个名为 `LegacyWrapper` 的包装器组件。该组件利用 `useRef` 和 `useEffect` Hooks，在 React 的生命周期内安全地调用这些非 React 函数，并将它们渲染到指定的 DOM 节点上。
6.  **渲染应用:** 在 `router-outlet` 元素上，使用 `ReactDOM.createRoot().render()` 来渲染根组件 `<App />`。

通过这次重构，路由逻辑变得更加清晰、可维护，并且完全融入了 React 的组件化和声明式生态。

---

## Q6: 如何为项目创建 GitHub Actions 工作流？

**问题描述:**
需要为 `d:\weappgroup\huasanJD\weFix-nitro-vite` 项目创建一个 GitHub Actions 工作流，以实现 CI/CD 自动化。

**解决方案:**
1.  **创建目录:** 在项目根目录下创建 `.github/workflows` 文件夹。
2.  **创建工作流文件:** 在该目录下创建一个名为 `main.yml` 的 YAML 文件。
3.  **配置工作流:**
    - **名称:** `CI`
    - **触发条件:** 在 `main` 分支上发生 `push` 或 `pull_request` 事件时触发。
    - **运行环境:** `ubuntu-latest`
    - **步骤:**
        1.  使用 `actions/checkout@v3` 检出代码。
        2.  使用 `actions/setup-node@v3` 设置 Node.js 20 环境。
        3.  运行 `npm install -g pnpm` 全局安装 pnpm。
        4.  运行 `pnpm install` 安装项目依赖。
        5.  运行 `pnpm run build` 构建项目。

**工作流代码 (`.github/workflows/main.yml`):**
```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: 检出代码
      uses: actions/checkout@v3
      
    - name: 设置 Node.js 环境
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: 安装 pnpm
      run: npm install -g pnpm
      
    - name: 安装依赖
      run: pnpm install
      
    - name: 构建项目
      run: pnpm run build
```

