/**
 * 应用程序入口文件
 */

// 核心依赖
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const path = require('path');
const config = require('config');

// 路由
const router = require('./routes');

// 自定义中间件
const middleware = require('./middleware');

// 工具函数
const { formatResponse, asyncHandler } = require('./utils/helpers');

// 创建Koa应用实例
const app = new Koa();

// 应用配置
const appConfig = config.get('app');
const PORT = process.env.PORT || appConfig.port || 3000;
const ENV = process.env.NODE_ENV || appConfig.env || 'development';

// 上下文拓展
app.context.utils = {
  formatResponse,
  asyncHandler
};

// 全局错误处理
app.on('error', (err, ctx) => {
  console.error('应用错误:', {
    message: err.message,
    stack: err.stack,
    url: ctx.url,
    method: ctx.method,
    status: ctx.status,
    timestamp: new Date().toISOString()
  });
});

// 中间件注册 (按顺序执行)
// 1. 请求响应时间 (提前注册，获取完整的请求时间)
app.use(middleware.responseTime());

// 2. 请求日志
app.use(middleware.logger());

// 3. 安全相关 (helmet提供了多种HTTP头安全)
app.use(helmet());

// 4. CORS支持
app.use(middleware.cors(config.get('cors')));

// 5. 请求体解析
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  onerror: (err, ctx) => {
    ctx.throw(422, '无效的请求体');
  }
}));

// 6. 响应压缩 (减小响应体积)
app.use(compress({
  threshold: 2048, // 2kb以上的响应进行压缩
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  br: false // 禁用brotli压缩
}));

// 7. 静态文件服务
app.use(serve(path.join(__dirname, 'public'), {
  maxage: ENV === 'production' ? 24 * 60 * 60 * 1000 : 0, // 生产环境缓存1天
  gzip: true
}));

// 8. 路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 9. 错误处理 (放在最后，处理所有未捕获的错误)
app.use(middleware.errorHandler());

// 仅在直接运行时启动服务器 (而不是被require时)
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`应用环境: ${ENV}`);
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 导出应用实例
module.exports = app;
