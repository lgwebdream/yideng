/**
 * 请求日志中间件
 * @param {Object} options - 配置选项
 * @returns {Function} Koa中间件
 */
module.exports = function logger(options = {}) {
  return async (ctx, next) => {
    const start = Date.now();
    
    // 请求开始日志
    console.log(
      `[${new Date().toISOString()}] ${ctx.method} ${ctx.url} - 请求开始`
    );
    
    try {
      await next();
      
      // 请求结束时记录
      const ms = Date.now() - start;
      const status = ctx.status || 404;
      
      console.log(
        `[${new Date().toISOString()}] ${ctx.method} ${ctx.url} - 状态: ${status} - 响应时间: ${ms}ms`
      );
    } catch (error) {
      // 错误日志
      const ms = Date.now() - start;
      console.error(
        `[${new Date().toISOString()}] ${ctx.method} ${ctx.url} - 错误: ${error.message} - 响应时间: ${ms}ms`
      );
      throw error;
    }
  };
};
