/**
 * 响应时间中间件 - 添加X-Response-Time头
 * @param {Object} options - 配置选项
 * @returns {Function} Koa中间件
 */
module.exports = function responseTime(options = {}) {
  return async (ctx, next) => {
    const start = Date.now();
    
    await next();
    
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  };
};
