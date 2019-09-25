const jwt = require("jsonwebtoken");
const config = require("./../config");

const isLogin = async (ctx, next) => {
  let token = ctx.request.header.Authorization;
  console.log(token);
  if (!token) {
    ctx.body = {
      success: false,
      data: "",
      code: 400,
      msg: "token不存在"
    };
    return false;
  }
  // 校验token
  await jwt.verify(token, config.tokenKey, async (err, decoded) => {
    if (err) {
      ctx.body = {
        success: false,
        data: "",
        code: 400,
        msg: "登录已过期"
      };
      return false;
    } else {
      ctx.state.user = decoded.data;
      await next(ctx);
    }
  });
  // // 判断是否有session
  // if(ctx.session && ctx.session.isLogin && ctx.session.userName) {
  //     ctx.state.user = {
  //         userName: ctx.session.userName,
  //         isAdmin: ctx.session.isAdmin
  //     };
  //     await next(ctx);
  // } else {
  //     ctx.body = {
  //         success: false,
  //         data: '',
  //         code: '30004',
  //         msg: '未登录'
  //     };
  //     return false;
  // }
};

module.exports = isLogin;
