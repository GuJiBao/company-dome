const newsService = require('./../../services/news');

module.exports = {
    /**
     * 新闻的添加
     * @param  {obejct} ctx 上下文对象
     */
    async create(ctx) {
        let formData = ctx.request.body;
        let { title, enTitle, details, enDetails, author, enAuthor } = formData;
        // 校验数据
        let validateResult = newsService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }
        // 查找该产品分类是否已存在数据库中
        let findResult = await newsService.getExistOne({
            '$or': [{title: title}, {enTitle: enTitle}]
        });
        if(findResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '新闻已存在'
            };
            return false;
        }
        // 添加产品
        let createResult = await newsService.create({
            title: title,
            enTitle: enTitle,
            details: details,
            enDetails: enDetails,
            author: author,
            enAuthor: enAuthor
        });
        if(!createResult._id) {
            ctx.body = {
                success: false,
                data: '',
                code: 30003,
                msg: '添加失败'
            };
            return false;
        }
        ctx.body = {
            success: true,
            data: '',
            code: 30000,
            msg: '添加成功'
        };
    },
    /**
     * 新闻的查询
     * @param  {obejct} ctx 上下文对象
     */
    async query(ctx) {
        let formData = ctx.request.query;
        try {
            let findResult = await newsService.query(formData);
            if(findResult.data) {
                ctx.body = {
                    success: true,
                    data: findResult.data,
                    code: 30000,
                    msg: '',
                    pageTotal: findResult.pageTotal
                };
                return false;
            }
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '查询失败'
            }
        } catch {
            ctx.body = {
                success: false,
                data: '',
                code: 30005,
                msg: '查询失败'
            }
        }
    },
    /**
     * 新闻的更新
     * @param {object} ctx 上下文对象 
     */
    async update(ctx) {
        let formData = ctx.request.body;
        let { id, title, enTitle, details, enDetails, author, enAuthor } = formData;
        
        // 校验数据
        let validateResult = newsService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }

        // 查找该新闻是否已存在数据库中
        let findResult = await newsService.getExistOne({
            _id: id
        });
        if(!findResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '分类不存在'
            };
            return false;
        }
        // 更新新闻
        let updateResult = await newsService.update({
            _id: id
        }, {
            title: title,
            enTitle: enTitle,
            details: details,
            enDetails: enDetails,
            author: author,
            enAuthor: enAuthor,
            updated_at: new Date()
        });
        if(!updateResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30003,
                msg: '更新失败'
            };
            return false;
        }
        ctx.body = {
            success: true,
            data: updateResult,
            code: 30000,
            msg: '更新成功'
        }
    },
    /**
     * 新闻的删除
     * @param {object} ctx 上下文对象
     */
    async delete(ctx) {
        let formData = ctx.request.query;
        let deleteResult = await newsService.delete(formData.id);
        if(deleteResult) {
            ctx.body = {
                success: true,
                data: '',
                code: 30000,
                msg: '删除成功'
            };
            return false;
        }
        ctx.body = {
            success: false,
            data: findResult,
            code: 30001,
            msg: '删除失败'
        };
    },
};