/**
 * 系统管理业务操作
 */
const BannerModel = require('../models/Banner');

module.exports = {
    /**
     * 数据库创建banner
     * @param {object} info 产品信息
     * @return {object} 创建结果
     */
    async bannerCreate(info) {
        return await new BannerModel(info).save();
    },
    /**
     * banner的更新
     * @param {object} opts 查找条件参数
     * @param {object} info  更新的产品信息
     * @return {object} 更新结果
     */
    async bannerUpdate(opts, info) {
        return await BannerModel.update(opts, info);
    },
    /**
     * 查找一个存在banner的数据
     * @param {object} opts 查找条件参数
     * @return {object|null}   查找结果
     */
    async getBannerExistOne(opts) {
        return await BannerModel.findOne(opts);
    },
    /**
     * banner的查询
     * @param {object} opts
     * @return {object|null}
     */
    async bannerQuery(opts) {
        let id = opts ? opts.id : '';
        if(id) {
            return await BannerModel.findOne({
                _id: id
            });
        }
        return await BannerModel.find().sort({ updated_at: -1 });
    },
    /**
     * banner的删除 
     * @param {number|null} id
     * @return {object|null} 
     */
    async bannerDelete(id) {
        return await BannerModel.remove({ _id: id });
    },
    /**
     * 验证banner添加、修改
     * @param {object} info
     * @return {object}
     */
    validatorBanner(info) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        if(!info.image) {
            return {
                ...result,
                msg: 'banner图片不能为空'
            }
        }
        return {
            success: true
        }
    }
}