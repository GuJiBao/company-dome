/**
 * 产品业务操作
 */
const ProductModel = require('../models/Product');

module.exports = {
    /**
     * 数据库创建产品
     * @param {object} proInfo 产品信息
     * @return {object} 创建结果
     */
    async create(proInfo) {
        return await new ProductModel(proInfo).save();
    },
    /**
     * 产品的更新
     * @param {object} opts 查找条件参数
     * @param {object} proInfo  更新的产品信息
     * @return {object} 更新结果
     */
    async update(opts, proInfo) {
        return await ProductModel.update(opts, proInfo);
    },
    /**
     * 查找一个存在产品的数据
     * @param {object} opts 查找条件参数
     * @return {object|null}   查找结果
     */
    async getExistOne(opts) {
        return await ProductModel.findOne(opts);
    },
    /**
     * 查询产品的总数
     * @return {number|null}
     */
    async queryCount() {
        return await ProductModel.countDocuments();
    },
    /**
     * 产品的查询
     * @param {object} opts
     * @return {object|null}
     */
    async query(opts) {
        let id = opts.id;
        let classify = opts.classify;
        let page = Number(opts.page || 1);
        let pageSize = Number(opts.pageSize || 10);
        let param = {};
        if(id) {
            return await ProductModel.findOne({
                _id: id
            }).populate('classify');
        }
        if(classify) {
            param = {
                ...param,
                classify
            }
        }
        let count = await this.queryCount();
        let pageTotal = Math.ceil(count / pageSize);    // 总页数
        page = Math.min(page, pageTotal); // 取值不能超过pages
        page = Math.max(page, 1); // 取值不能小于1
        let skip = (page - 1) * pageSize;   // 忽略的数据条数
        return {
            data: await ProductModel.find(param).limit(pageSize).skip(skip).populate('classify').sort({ updated_at: -1 }),
            pageTotal: pageTotal
        };
    },
    /**
     * 产品的搜索
     * @param {object|null} opts
     * @return {object|null}
     */
    async search(opts) {
        return await ProductModel.find(opts);
    },
    /**
     * 产品的删除 
     * @param {number|null} id
     * @return {object|null} 
     */
    async delete(id) {
        return await ProductModel.remove({ _id: id });
    },
    /**
     * 验证产品添加、修改
     * @param {object} proInfo
     * @return {object}
     */
    validatorProClassify(proInfo) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        if(!proInfo.name) {
            return {
                ...result,
                msg: '产品名称不能为空'
            }
        }
        if(!proInfo.enName) {
            return {
                ...result,
                msg: '英文名称不能为空'
            }
        }
        if(!proInfo.classify) {
            return {
                ...result,
                msg: '产品分类不能为空'
            }
        }
        if(!proInfo.image) {
            return {
                ...result,
                msg: '产品图片不能为空'
            }
        }
        return {
            success: true
        }
    }
};