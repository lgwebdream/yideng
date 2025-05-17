/**
 * 导出所有中间件
 */
const errorHandler = require('./errorHandler');
const logger = require('./logger');
const responseTime = require('./responseTime');
const cors = require('./cors');

module.exports = {
  errorHandler,
  logger,
  responseTime,
  cors
};
