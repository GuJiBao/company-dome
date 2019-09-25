/**
 * 新闻业务操作
 */
const NewsModel = require('../models/News');

module.exports = {
    /**
     * 数据库创建新闻
     * @param {object} newsInfo 产品信息
     * @return {object} 创建结果
     */
    async create(newsInfo) {
        return await new NewsModel(newsInfo).save();
    },
    /**
     * 查找一个存在新闻的数据
     * @param {object} opts 查找条件参数
     * @return {object|null}   查找结果
     */
    async getExistOne(opts) {
        return await NewsModel.findOne(opts);
    },
    /**
     * 新闻的更新
     * @param {object} opts 查找条件参数
     * @param {object} proInfo  更新的产品信息
     * @return {object} 更新结果
     */
    async update(opts, proInfo) {
        return await NewsModel.update(opts, proInfo);
    },
    /**
     * 查询新闻的总数 
     */
    async queryCount() {
        return await NewsModel.countDocuments();
    },
    /**
     * 新闻的查询
     * @param {object|null} opts
     * @return {object|null}
     */
    async query(opts) {
        let id = opts.id;
        let page = Number(opts.page || 1);
        let pageSize = Number(opts.pageSize || 10);
        if(id) {
            return this.getExistOne({
                _id: id
            });
        }
        let count = await this.queryCount();
        let pageTotal = Math.ceil(count / pageSize);    // 总页数
        page = Math.min(page, pageTotal); // 取值不能超过pages
        page = Math.max(page, 1); // 取值不能小于1
        let skip = (page - 1) * pageSize;   // 忽略的数据条数
        return {
            data: await NewsModel.find().limit(pageSize).skip(skip).sort({ updated_at: -1 }),
            pageTotal: pageTotal
        };
    },
    /**
     * 新闻的删除 
     * @param {number|null} id
     * @return {object|null} 
     */
    async delete(id) {
        return await NewsModel.remove({ _id: id });
    },
    /**
     * 验证新闻添加、修改
     * @param {object} newsInfo
     * @return {object}
     */
    validatorProClassify(newsInfo) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        if(!newsInfo.title) {
            return {
                ...result,
                msg: '新闻标题不能为空'
            }
        }
        return {
            success: true
        }
    }
};