/**
 * 产品分类业务操作
 */
const ProductClassifyModel = require('../models/ProductClassify');

module.exports = {
    /**
     * 数据库创建产品分类
     * @param {object} classifyInfo 分类信息
     * @return {object} 创建结果
     */
    async create(classifyInfo) {
        return await new ProductClassifyModel(classifyInfo).save();
    },
    /**
     * 产品分类的更新
     * @param {object} opts 查找条件参数
     * @param {object} classifyInfo  更新的分类信息
     * @return {object} 更新结果
     */
    async update(opts, classifyInfo) {
        return await ProductClassifyModel.update(opts, classifyInfo);
    },
    /**
     * 查找一个存在分类的数据
     * @param {object} opts 查找条件参数
     * @return {object|null}   查找结果
     */
    async getExistOne(opts) {
        return await ProductClassifyModel.findOne(opts);
    },
    /**
     * 产品分类的查询
     * @param {number|null} id
     * @return {object|null}
     */
    async query(id) {
        if(id) {
            return await this.getExistOne({
                _id: id
            });
        }
        return await ProductClassifyModel.find().sort({ updated_at: -1 });
    },
    /**
     * 产品分类的删除 
     * @param {number|null} id
     * @return {object|null} 
     */
    async delete(id) {
        return await ProductClassifyModel.remove({ _id: id });
    },
    /**
     * 验证产品分类添加、修改
     * @param {object} classifyInfo
     * @return {object}
     */
    validatorProClassify(classifyInfo) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        if(!classifyInfo.name) {
            return {
                ...result,
                msg: '产品分类不能为空'
            }
        }
        if(!classifyInfo.enName) {
            return {
                ...result,
                msg: '产品分类（英文）不能为空'
            }
        }
        return {
            success: true
        }
    }
};