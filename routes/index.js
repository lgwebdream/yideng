const Router = require('koa-router');
const HomeController = require('../controllers/HomeController');

const router = new Router();

// 主页路由
router.get('/', HomeController.index);

// API路由
router.get('/api/hello', HomeController.hello);

module.exports = router;
