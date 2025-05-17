# Yideng Koa框架

这是一个基础的Koa.js项目框架，提供了简单的目录结构和基础配置。

## 功能特点

- 基于Koa.js的轻量级框架
- 已配置路由和控制器
- 支持静态文件服务
- 请求体解析支持

## 目录结构

```
yideng/
├── app.js              # 应用程序入口
├── controllers/        # 控制器目录
│   └── HomeController.js
├── routes/             # 路由目录
│   └── index.js
├── public/             # 静态资源目录
├── package.json        # 项目依赖
└── README.md           # 项目说明
```

## 运行项目

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境运行

```bash
npm start
```

服务器会在 http://localhost:3000 上启动。

## API端点

- `GET /`: 返回欢迎信息
- `GET /api/hello`: 返回Hello World信息和时间戳

## 拓展功能

您可以根据需要添加以下功能：

1. 数据库连接（如MongoDB、MySQL）
2. 用户认证
3. 日志记录
4. 配置文件
5. 测试框架

## 许可证

MIT
