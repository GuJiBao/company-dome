const fs = require("fs");

module.exports = {
  /**
   * 文件上传
   * @param  {obejct} ctx 上下文对象
   */
  async upload(ctx) {
    // console.log(ctx.req);
    ctx.body = {
      success: true,
      data: ctx.req.file,
      code: 30000,
      msg: "上传成功"
    };
  },
  /**
   * 图片的删除
   * @param  {obejct} ctx 上下文对象
   */
  async delImage(ctx) {
    let formData = ctx.request.body;
    let path = formData.path;
    if (!path) {
      ctx.body = {
        success: false,
        data: "",
        code: "30001",
        msg: "图片路径不存在"
      };
      return false;
    }
    try {
      // 如果图片不存在，则直接返回成功
      if(!fs.existsSync(path)) {
        ctx.body = {
          success: true,
          data: "",
          msg: "删除成功",
          code: 30000
        };
        return false;
      }
      // 删除图片
      fs.unlink(path, err => {
        if (err) throw err;
      });
      ctx.body = {
        success: true,
        data: "",
        msg: "删除成功",
        code: 30000
      };
    } catch (error) {
      ctx.body = {
        success: false,
        data: "",
        msg: "删除失败",
        code: 30001
      };
    }
  }
};
