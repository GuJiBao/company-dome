/**
 * 生成验证码
 */
const captchaService = require('../../services/captcha');

module.exports = {
  /**
   * 验证码的创建
   * @param  {obejct} ctx 上下文对象
   */
  async create(ctx) {
    let createResult = await captchaService.create();
    if(!createResult.success) {
      return {
        success: false,
        data: '',
        code: 30001,
        msg: '验证码生成失败'
      }
    }
    let {img, text} = createResult.data;
    // 保存验证码到cookies
    ctx.cookies.set('captcha', text, {maxAge: 360000, httpOnly: true});
    ctx.body = {
      success: true,
      data: img,
      code: 30000,
      msg: ''
    }
  }
};
