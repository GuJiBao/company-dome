/**
 * 联系我们业务操作
 */
const contactModel = require("./../models/Contact");

module.exports = {
  /**
   * 数据库创建联系我们
   * @param {object} info 信息
   * @return {object} 创建结果
   */
  async create(info) {
    return await new contactModel(info).save();
  },
  /**
   * 联系我们的更新
   * @param {object} opts 查找条件参数
   * @param {object} info  更新的关于我们信息
   * @return {object} 更新结果
   */
  async update(opts, info) {
    return await contactModel.update(opts, info);
  },
  /**
   * 查找一个存在联系我们的数据
   * @param {object} opts 查找条件参数
   * @return {object|null}   查找结果
   */
  async getExistOne(opts) {
    return await contactModel.findOne(opts);
  },
  /**
   * 联系我们的查询
   * @return {object|null}
   */
  async query() {
    return await contactModel.find();
  },
  /**
   * 验证添加、修改
   * @param {object} info
   * @return {object}
   */
  validator(info) {
    let result = {
      success: false,
      data: "",
      code: 30001
    };
    if (!info.name) {
      return {
        ...result,
        msg: "客服姓名不能为空"
      };
    }
    if (!info.tel) {
      return {
        ...result,
        msg: "电话不能为空"
      };
    }
    if (!info.phone) {
      return {
        ...result,
        msg: "手机不能为空"
      };
    }
    if (!info.email) {
      return {
        ...result,
        msg: "邮箱不能为空"
      };
    }
    if (!info.address) {
      return {
        ...result,
        msg: "地址不能为空"
      };
    }
    if (!info.skype) {
      return {
        ...result,
        msg: "skype不能为空"
      };
    }
    if (!info.weChat) {
      return {
        ...result,
        msg: "weChat不能为空"
      };
    }
    if (!info.whatsApp) {
      return {
        ...result,
        msg: "whatsApp不能为空"
      };
    }
    if (!info.qq) {
      return {
        ...result,
        msg: "qq不能为空"
      };
    }
    return {
      success: true
    };
  }
};
