/**
 * 系统管理
 */
const fs = require("fs");
const systemService = require("./../../services/system");

module.exports = {
  /**
   * banner的添加
   * @param  {obejct} ctx 上下文对象
   */
  async bannerCreate(ctx) {
    let formData = ctx.request.body;
    let { image, url, title, intro } = formData;
    // 校验数据
    let validateResult = systemService.validatorBanner(formData);
    if (!validateResult.success) {
      ctx.body = validateResult;
      return false;
    }
    // 添加banner
    let createResult = await systemService.bannerCreate({
      image: image,
      url: url,
      title: title,
      intro: intro
    });
    if (!createResult._id) {
      ctx.body = {
        success: false,
        data: "",
        code: 30003,
        msg: "添加失败"
      };
      return false;
    }
    ctx.body = {
      success: true,
      data: "",
      code: 30000,
      msg: "添加成功"
    };
  },
  /**
   * banner的查询
   * @param  {obejct} ctx 上下文对象
   */
  async bannerQuery(ctx) {
    let formData = ctx.request.query;
    try {
      let findResult = await systemService.bannerQuery(formData);
      if (findResult) {
        ctx.body = {
          success: true,
          data: findResult,
          code: 30000,
          msg: ""
        };
        return false;
      }
      ctx.body = {
        success: false,
        data: "",
        code: 30002,
        msg: "查询失败"
      };
    } catch {
      ctx.body = {
        success: false,
        data: "",
        code: 30005,
        msg: "查询失败"
      };
    }
  },
  /**
   * banner的更新
   * @param {object} ctx 上下文对象
   */
  async bannerUpdate(ctx) {
    let formData = ctx.request.body;
    let { id, image, url, title, intro } = formData;

    // 校验数据
    let validateResult = systemService.validatorBanner(formData);
    if (!validateResult.success) {
      ctx.body = validateResult;
      return false;
    }

    // 查找该banner是否已存在数据库中
    let findResult = await systemService.getBannerExistOne({
      _id: id
    });
    if (!findResult) {
      ctx.body = {
        success: false,
        data: "",
        code: 30002,
        msg: "banner不存在"
      };
      return false;
    }
    // 更新banner
    let updateResult = await systemService.bannerUpdate(
      {
        _id: id
      },
      {
        image: image,
        url: url,
        title: title,
        intro: intro,
        updated_at: new Date()
      }
    );
    if (!updateResult) {
      ctx.body = {
        success: false,
        data: "",
        code: 30003,
        msg: "更新失败"
      };
      return false;
    }
    ctx.body = {
      success: true,
      data: updateResult,
      code: 30000,
      msg: "更新成功"
    };
  },
  /**
   * banner的删除
   * @param {object} ctx 上下文对象
   */
  async bannerDelete(ctx) {
    let formData = ctx.request.query;
    let id = formData.id;
    // 查找该产品信息
    let findResult = await systemService.getBannerExistOne({
      _id: id
    });
    if (findResult) {
      let path = findResult.image.path;
      if (fs.existsSync(path)) {
        // 删除图片
        fs.unlink(path, err => {
          if (err) throw err;
        });
      }
    }
    let deleteResult = await systemService.bannerDelete(formData.id);
    if (deleteResult) {
      ctx.body = {
        success: true,
        data: "",
        code: 30000,
        msg: "删除成功"
      };
      return false;
    }
    ctx.body = {
      success: false,
      data: findResult,
      code: 30001,
      msg: "删除失败"
    };
  }
};
