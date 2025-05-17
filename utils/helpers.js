/**
 * 通用辅助函数
 */

/**
 * 格式化响应对象
 * @param {String} status - 状态 ('success' 或 'error')
 * @param {Any} data - 响应数据
 * @param {String} message - 响应消息
 * @returns {Object} 格式化的响应对象
 */
exports.formatResponse = (status = 'success', data = null, message = '') => {
  return {
    status,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};

/**
 * 创建成功响应
 * @param {Any} data - 响应数据
 * @param {String} message - 响应消息
 * @returns {Object} 成功响应对象
 */
exports.successResponse = (data = null, message = '操作成功') => {
  return exports.formatResponse('success', data, message);
};

/**
 * 创建错误响应
 * @param {String} message - 错误消息
 * @param {String} code - 错误代码
 * @param {Any} data - 附加数据
 * @returns {Object} 错误响应对象
 */
exports.errorResponse = (message = '操作失败', code = 'UNKNOWN_ERROR', data = null) => {
  return {
    status: 'error',
    code,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * 异步处理包装器 (避免try-catch)
 * @param {Function} fn - 异步函数
 * @returns {Function} Koa中间件
 */
exports.asyncHandler = (fn) => async (ctx, next) => {
  try {
    return await fn(ctx, next);
  } catch (error) {
    ctx.app.emit('error', error, ctx);
    throw error;
  }
};

/**
 * 睡眠函数 (延迟)
 * @param {Number} ms - 毫秒
 * @returns {Promise} 延迟Promise
 */
exports.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成随机ID
 * @param {Number} length - ID长度
 * @returns {String} 随机ID
 */
exports.generateId = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * 安全解析JSON
 * @param {String} str - JSON字符串
 * @param {Any} defaultValue - 解析失败时的默认值
 * @returns {Any} 解析后的对象或默认值
 */
exports.safeJsonParse = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * 分页助手
 * @param {Number} page - 页码
 * @param {Number} limit - 每页数量
 * @param {Number} total - 总数
 * @returns {Object} 分页信息
 */
exports.paginationHelper = (page = 1, limit = 10, total = 0) => {
  const currentPage = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / pageSize);
  
  return {
    currentPage,
    pageSize,
    totalItems: total,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};
