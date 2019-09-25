/**
 * 产品业务操作
 */
const FeedbookModel = require('../models/Feedback');

module.exports = {
    /**
     * 数据库创建feedbook
     * @param {object} info 信息
     * @return {object} 创建结果
     */
    async create(info) {
        return await new FeedbookModel(info).save();
    },
    /**
     * 查询产品的总数
     * @return {number|null}
     */
    async queryCount() {
        return await FeedbookModel.countDocuments();
    },
    /**
     * feedfack的查询
     * @param {object} opts
     * @return {object|null}
     */
    async query(opts) {
        let id = opts.id;
        let page = Number(opts.page || 1);
        let pageSize = Number(opts.pageSize || 10);
        if(id) {
            return await FeedbookModel.findOne({
                _id: id
            });
        }
        let count = await this.queryCount();
        let pageTotal = Math.ceil(count / pageSize);    // 总页数
        page = Math.min(page, pageTotal); // 取值不能超过pages
        page = Math.max(page, 1); // 取值不能小于1
        let skip = (page - 1) * pageSize;   // 忽略的数据条数
        return {
            data: await FeedbookModel.find().limit(pageSize).skip(skip).sort({ updated_at: -1 }),
            pageTotal: pageTotal
        };
    },
    /**
     * feedback的删除 
     * @param {number|null} id
     * @return {object|null} 
     */
    async delete(id) {
        return await FeedbookModel.remove({ _id: id });
    },
    /**
     * 验证feedbook添加、修改
     * @param {object} info
     * @return {object}
     */
    validatorProClassify(info) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        if(!info.name) {
            return {
                ...result,
                msg: '产品名称不能为空'
            }
        }
        if(!info.email) {
            return {
                ...result,
                msg: '邮箱不能为空'
            }
        }
        if(!info.content) {
            return {
                ...result,
                msg: '内容不能为空'
            }
        }
        return {
            success: true
        }
    },
    /**
     * 校验验证码
     * @param ctx 上下文对象
     * @param {string} code
     * @return {object}
     */
    validateCaptcha(ctx, code) {
        let result = {
            success: false,
            data: '',
            code: 30001
        };
        let feedbackCaptcha = ctx.cookies.get('captcha');
        if(feedbackCaptcha !== code) {
            return {
                ...result,
                msg: '验证码不正确'
            }
        }
        return {
            success: true
        }
    }

}