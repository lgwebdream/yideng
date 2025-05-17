/**
 * 错误处理中间件
 * @param {Object} options - 配置选项
 * @returns {Function} Koa中间件
 */
module.exports = function errorHandler(options = {}) {
  return async (ctx, next) => {
    try {
      await next();
      
      // 处理404错误
      if (ctx.status === 404 && !ctx.body) {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          code: 'NOT_FOUND',
          message: '请求的资源不存在'
        };
      }
    } catch (err) {
      console.error('应用错误:', err);
      
      // 记录错误日志
      ctx.app.emit('error', err, ctx);
      
      // 设置状态码和错误响应
      const status = err.status || 500;
      ctx.status = status;
      
      // 格式化错误响应
      ctx.body = {
        status: 'error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: status === 500 && process.env.NODE_ENV === 'production'
          ? '服务器内部错误'
          : err.message || '未知错误'
      };
      
      // 开发环境下返回错误堆栈
      if (process.env.NODE_ENV !== 'production' && err.stack) {
        ctx.body.stack = err.stack;
      }
    }
  };
};
