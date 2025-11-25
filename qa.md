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
