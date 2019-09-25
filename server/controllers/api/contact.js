const contactService = require("../../services/contact");

module.exports = {
  /**
   * 联系我们的保存
   * @param  {obejct} ctx 上下文对象
   */
  async save(ctx) {
    let formData = ctx.request.body;
    let {
      id,
      name,
      tel,
      phone,
      email,
      address,
      enAddress,
      skype,
      weChat,
      whatsApp,
      qq
    } = formData;
    // 校验数据
    let validateResult = contactService.validator(formData);
    if (!validateResult.success) {
      ctx.body = validateResult;
      return false;
    }
    // 查找是否已存在数据库中
    let findResult = await contactService.getExistOne({
      _id: id
    });
    // 不存在，添加
    if (!findResult) {
      // 添加关于我们
      let createResult = await contactService.create({
        name: name,
        tel: tel,
        phone: phone,
        email: email,
        address: address,
        enAddress: enAddress,
        skype: skype,
        weChat: weChat,
        whatsApp: whatsApp,
        qq: qq
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
      return false;
    }
    // 更新关于我们
    let updateResult = await contactService.update(
      {
        _id: id
      },
      {
        name: name,
        tel: tel,
        phone: phone,
        email: email,
        address: address,
        enAddress: enAddress,
        skype: skype,
        weChat: weChat,
        whatsApp: whatsApp,
        qq: qq,
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
   * 联系我们的查询
   * @param  {obejct} ctx 上下文对象
   */
  async query(ctx) {
    let formData = ctx.request.query;
    try {
      let findResult = await contactService.query();
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
        success: true,
        data: "",
        code: 30002,
        msg: "数据不存在"
      };
    } catch {
      ctx.body = {
        success: false,
        data: "",
        code: 30005,
        msg: "查询失败"
      };
    }
  }
};
