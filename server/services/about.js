/**
 * 关于我们业务操作
 */
const AboutModel = require("../models/About");

module.exports = {
  /**
   * 数据库创建关于我们
   * @param {object} info 信息
   * @return {object} 创建结果
   */
  async create(info) {
    return await new AboutModel(info).save();
  },
  /**
   * 关于我们的更新
   * @param {object} opts 查找条件参数
   * @param {object} info  更新的关于我们信息
   * @return {object} 更新结果
   */
  async update(opts, info) {
    return await AboutModel.update(opts, info);
  },
  /**
   * 查找一个存在关于我们的数据
   * @param {object} opts 查找条件参数
   * @return {object|null}   查找结果
   */
  async getExistOne(opts) {
    return await AboutModel.findOne(opts);
  },
  /**
   * 关于我们的查询
   * @return {object|null}
   */
  async query() {
    return await AboutModel.find();
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
    if (info.images.length <= 0) {
      return {
        ...result,
        msg: "公司图片不能为空"
      };
    }
    if (!info.details) {
      return {
        ...result,
        msg: "公司简介不能为空"
      };
    }
    if (!info.enDetails) {
      return {
        ...result,
        msg: "英文简介不能为空"
      };
    }
    return {
      success: true
    };
  }
};
