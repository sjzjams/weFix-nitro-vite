# Nitro App API 集成方案文档

本文档详细描述了将 `nitro-app-api` 项目集成到 `parizxkpmj.github`（Vite + Nitro 模板）项目中的完整过程、技术决策和最终配置。

## 1. 集成目标

将一个独立的 Nitro 后端应用 (`nitro-app-api`) 无缝集成到一个基于 Vite 和 Nitro 的全栈项目模板中，实现：
- 统一的开发环境和构建流程。
- 共享的依赖管理。
- 保留并扩展 `nitro-app-api` 的所有功能，包括数据库查询页面。
- 遵循目标项目的代码风格和目录结构。

## 2. 集成步骤与技术实现

### 2.1. 依赖合并

- **操作**: 将 `nitro-app-api` 的 `dependencies` 和 `devDependencies` 合并到 `parizxkpmj.github` 的 `package.json` 文件中。
- **关键依赖**:
  - `@prisma/client`, `prisma`: 用于数据库操作。
  - `winston`: 用于日志记录。
  - `ioredis`: 用于 Redis 连接。
  - 其他如 `jsonwebtoken`, `bcryptjs` 等。
- **结果**: 单一 `package.json` 管理所有项目依赖，通过 `npm install` 一次性安装。

### 2.2. 配置文件迁移与调整

#### `nitro.config.ts`
- **操作**: 合并 `nitro-app-api` 的 Nitro 配置到 `parizxkpmj.github` 的 `nitro.config.ts`。
- **关键调整**:
  1.  **`runtimeConfig`**: 迁移了 `database`, `redis`, `jwt` 等所有运行时配置，确保 API 所需的环境变量和配置可用。
  2.  **`plugins`**: 迁移了数据库 (`database.ts`)、Redis (`redis.ts`) 和日志 (`logger.ts`) 的插件配置。
  3.  **路径修复**: 插件路径最初配置为 `~/plugins/...`，在 Vite 环境下无法正确解析。经过两次尝试，最终确定正确的路径格式是相对于项目根目录的完整路径，例如：`./server/plugins/database`。

#### `.env`
- **操作**: 将 `nitro-app-api` 的 `.env` 文件内容（主要是 `DATABASE_URL`）迁移到 `parizxkpmj.github` 的 `.env` 文件中，为 Prisma 和其他服务提供必要的环境变量。

### 2.3. 后端代码迁移

- **`server/api`**: 迁移了所有 API 路由，包括动态路由 `database/[table]/data.ts` 和 `database/[table]/index.ts`，以及 `database/tables.ts`。
- **`server/plugins`**: 迁移了 `database.ts`, `logger.ts`, `redis.ts` 等核心插件，用于在 Nitro 上下文中注入 Prisma 客户端、日志记录器等。
- **`server/prisma`**: 迁移了 `schema.prisma` 文件，其中定义了数据库模型。

### 2.4. 前端静态资源迁移

- **操作**: 将 `nitro-app-api/public` 目录下的 `database-explorer.html`, `database-explorer.js`, 和 `styles.css` 文件复制到 `parizxkpmj.github/public` 目录下。
- **结果**: 数据库查询的前端页面可以通过 `http://localhost:3001/database-explorer.html` 直接访问。

## 3. 遇到的问题与解决方案

### 问题一：Nitro 插件路径解析失败
- **现象**: 启动开发服务器时报错 `Error: Cannot find module '.../plugins/database'`。
- **原因**: 在 Vite + Nitro 集成项目中，`nitro.config.ts` 中的插件路径别名 `~` 或相对 `serverDir` 的路径 `./` 无法被正确解析。
- **解决方案**: 将插件路径修改为相对于**项目根目录**的完整路径，例如：`plugins: ['./server/plugins/database']`。

### 问题二：Prisma Client 未初始化
- **现象**: 修复插件路径后，启动时报错 `Error: @prisma/client did not initialize yet. Please run "prisma generate" ...`。
- **原因**: 在安装依赖或修改 `schema.prisma` 后，没有运行 `prisma generate` 来生成类型安全的 Prisma 客户端。
- **解决方案**: 运行 `npx prisma generate` 命令。

### 问题三：`prisma generate` 找不到 Schema 文件
- **现象**: 运行 `npx prisma generate` 时报错 `Error: Could not find Prisma Schema...`。
- **原因**: `schema.prisma` 文件位于非标准的 `server/prisma/` 目录下，而 Prisma CLI 默认在根目录或 `prisma/` 目录中查找。
- **解决方案**: 在 `package.json` 文件中添加 `prisma` 字段，明确指定 schema 文件的路径：
  ```json
  "prisma": {
    "schema": "server/prisma/schema.prisma"
  }
  ```

## 4. 开发与验证指南

1.  **安装依赖**:
    ```bash
    npm install
    ```
2.  **生成 Prisma Client**: (在初次设置或修改 `schema.prisma` 后执行)
    ```bash
    npx prisma generate
    ```
3.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
4.  **访问应用**:
    - **主页**: `http://localhost:3001/`
    - **数据库浏览器**: `http://localhost:3001/database-explorer.html`

## 5. 总结

通过上述步骤，`nitro-app-api` 已成功集成到 `parizxkpmj.github` 项目中。整个过程解决了配置、路径和工具链中的多个关键问题，最终形成了一个统一、可维护的全栈开发环境。

## 6. 数据库浏览器页面重构

为了与 `app` 目录的开发规范保持一致，原有的 `database-explorer.html` 页面被完全重构。新的实现遵循了原生、无框架的原则，并采用了组件化的架构。

### 6.1. 技术栈

- **语言**: TypeScript
- **UI**: 原生 DOM API (无 React, Vue 等框架)
- **状态管理**: 自定义实现的简单 `EventEmitter`
- **API 请求**: 原生 `fetch` API
- **构建**: Vite

### 6.2. 组件化架构

重构后的页面由以下四个核心组件构成，每个组件都封装在自己的模块中：

- **`ConnectionManager`**: 显示数据库连接状态（在此版本中为静态显示）。
- **`TableBrowser`**: 从后端获取并显示数据库中的所有表。用户可以点击表名来查看其内容。
- **`QueryPanel`**: 提供一个文本区域供用户输入和执行自定义 SQL 查询。
- **`ResultsDisplay`**: 显示来自 `TableBrowser`（表数据）或 `QueryPanel`（查询结果）的数据。

### 6.3. 状态管理

- **`app/database-explorer/state.ts`**: 一个中央 `AppState` 类继承自 `EventEmitter`，用于管理和广播应用状态的变化。
- **主要事件**:
  - `tablesChanged`: 当获取到数据库表列表时触发。
  - `selectedTableChanged`: 当用户在 `TableBrowser` 中选择一个表时触发。
  - `queryResultsChanged`: 当 `QueryPanel` 执行查询并返回结果时触发。

### 6.4. 单元测试

- **框架**: Vitest
- **环境**: `jsdom` 用于模拟浏览器环境，以便测试中可以使用 DOM API。
- **覆盖范围**: 为每个核心组件编写了单元测试，以验证其渲染和交互逻辑。
- **配置**: 在项目根目录创建了 `vitest.config.ts` 文件来配置测试环境。