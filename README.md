# Rakuten API Demo

一个响应式的 Web 应用，用于查询 Rakuten 商品并显示最低价格的10件商品。

## 功能特性

- 📖 **Guide 页面**: 详细的 Rakuten Developer ID 注册指南
- ⚙️ **设置页面**: 配置 Application ID 和 Affiliate ID
- 🔍 **商品查询**: 搜索并显示最低价格的10件商品
- 📱 **响应式设计**: 支持桌面和移动设备
- 🧪 **完整测试**: 单元测试和端到端测试

## 技术栈

- **前端**: React + Ant Design
- **后端**: Node.js + Express + SQLite
- **测试**: Jest (单元测试) + Cypress (端到端测试)

## 快速开始

### 1. 安装依赖

```bash
# 安装所有依赖
npm run install:all
```

### 2. 启动开发服务器

```bash
# 同时启动前端和后端
npm run dev

# 或者分别启动
npm run start:backend  # 后端 (http://localhost:3001)
npm run start:frontend # 前端 (http://localhost:3000)
```

### 3. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 测试

### 运行所有测试

```bash
# 运行后端单元测试
npm run test:backend

# 运行前端单元测试
npm run test:frontend

# 运行端到端测试
npm run test:e2e

# 运行所有测试
npm run test:all
```

### 测试覆盖率

```bash
# 后端测试覆盖率
cd backend && npm run test:coverage
```

## 项目结构

```
rpi/
├── backend/                 # 后端服务
│   ├── index.js            # 主服务器文件
│   ├── index.test.js       # 后端测试
│   └── package.json
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── App.js         # 主应用组件
│   │   ├── GuidePage.js   # 指南页面
│   │   ├── SettingsPage.js # 设置页面
│   │   ├── SearchPage.js  # 查询页面
│   │   └── App.test.js    # 前端测试
│   ├── cypress/           # 端到端测试
│   └── package.json
└── README.md
```

## API 文档

### 后端 API

- `GET /` - 健康检查
- `GET /api/settings` - 获取设置
- `POST /api/settings` - 保存设置
- `POST /api/search` - 商品搜索

### 前端页面

- `/` - Guide 页面（默认）
- `/settings` - 设置页面
- `/search` - 商品查询页面

## 开发指南

### 添加新功能

1. 在后端添加新的 API 路由
2. 在前端添加对应的组件
3. 编写单元测试
4. 编写端到端测试

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 React 最佳实践
- 保持测试覆盖率 > 80%

## 部署

### 生产环境

```bash
# 构建前端
cd frontend && npm run build

# 启动后端
cd backend && npm start
```

### 环境变量

- `PORT` - 后端端口（默认: 3001）
- `NODE_ENV` - 环境模式（development/production）

## 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 运行测试
5. 创建 Pull Request

## 许可证

MIT License 