const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const router = require('./routes');

// 初始化Koa应用
const app = new Koa();

// 中间件配置
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
  console.error('服务器错误', err);
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
