/**
 * CORS中间件
 * @param {Object} options - 配置选项
 * @returns {Function} Koa中间件
 */
module.exports = function cors(options = {}) {
  const defaultOptions = {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: [],
    credentials: false,
    maxAge: 86400 // 24小时
  };
  
  const corsOptions = { ...defaultOptions, ...options };
  
  return async (ctx, next) => {
    // 设置CORS头
    const requestOrigin = ctx.get('Origin');
    
    if (!requestOrigin) {
      return await next();
    }
    
    // 允许的域名
    if (corsOptions.origin === '*') {
      ctx.set('Access-Control-Allow-Origin', requestOrigin);
    } else if (Array.isArray(corsOptions.origin)) {
      if (corsOptions.origin.includes(requestOrigin)) {
        ctx.set('Access-Control-Allow-Origin', requestOrigin);
      }
    } else if (corsOptions.origin === requestOrigin) {
      ctx.set('Access-Control-Allow-Origin', requestOrigin);
    }
    
    // 如果是预检请求
    if (ctx.method === 'OPTIONS') {
      ctx.set('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
      ctx.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '));
      
      if (corsOptions.exposedHeaders.length) {
        ctx.set('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(', '));
      }
      
      if (corsOptions.credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true');
      }
      
      if (corsOptions.maxAge) {
        ctx.set('Access-Control-Max-Age', String(corsOptions.maxAge));
      }
      
      ctx.status = 204; // No Content
      return;
    }
    
    // 继续处理请求
    await next();
    
    // 设置附加的CORS头
    if (corsOptions.credentials) {
      ctx.set('Access-Control-Allow-Credentials', 'true');
    }
    
    if (corsOptions.exposedHeaders.length) {
      ctx.set('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(', '));
    }
  };
};
