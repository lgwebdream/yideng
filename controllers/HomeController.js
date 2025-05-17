class HomeController {
  /**
   * 首页控制器
   * @param {Object} ctx - Koa上下文
   */
  static async index(ctx) {
    ctx.body = {
      message: '欢迎使用Yideng Koa框架!',
      status: 'success'
    };
  }

  /**
   * Hello API控制器
   * @param {Object} ctx - Koa上下文
   */
  static async hello(ctx) {
    ctx.body = {
      message: 'Hello World!',
      timestamp: new Date()
    };
  }
}

module.exports = HomeController;
