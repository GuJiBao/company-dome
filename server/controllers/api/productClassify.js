const proClassifyService = require('./../../services/productClassify');
const proService = require('./../../services/product');

module.exports = {
    /**
     * 产品分类的添加
     * @param  {obejct} ctx 上下文对象
     */
    async create(ctx) {
        let formData = ctx.request.body;
        let name = formData.name;
        let enName = formData.enName;

        // 校验数据
        let validateResult = proClassifyService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }

        // 查找该产品分类是否已存在数据库中
        let findResult = await proClassifyService.getExistOne({
            name: name
        });
        if(findResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '分类已存在'
            };
            return false;
        }

        // 创建分类
        let createResult = await proClassifyService.create({
            name: name,
            enName: enName
        });
        if(!createResult._id) {
            ctx.body = {
                success: false,
                data: '',
                code: 30003,
                msg: '分类创建失败'
            };
            return false;
        }

        ctx.body = {
            success: true,
            data: '',
            code: 30000,
            msg: '分类添加成功'
        };
    },
    /**
     * 产品分类的更新
     * @param {object} ctx 上下文对象 
     */
    async update(ctx) {
        let formData = ctx.request.body;
        let id = formData.id;
        let name = formData.name;
        let enName = formData.enName;
        
        // 校验数据
        let validateResult = proClassifyService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }

        // 查找该产品分类是否已存在数据库中
        let findResult = await proClassifyService.getExistOne({
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
        // 更新分类
        let updateResult = await proClassifyService.update({
            _id: id
        }, {
            name: name,
            enName: enName,
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
     * 产品分类的查询
     * @param  {obejct} ctx 上下文对象
     */
    async query(ctx) {
        let formData = ctx.request.body;
        try {
            let findResult = await proClassifyService.query(formData.id);
            if(findResult) {
                ctx.body = {
                    success: true,
                    data: findResult,
                    code: 30000,
                    msg: ''
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
     * 产品分类的删除
     * @param {object} ctx 上下文对象
     */
    async delete(ctx) {
        let formData = ctx.request.query;
        let id = formData.id;
        // 搜索该分类是否有产品
        let searchResult = await proService.search({
            classify: id
        });
        if(searchResult.length > 0) {
            ctx.body = {
                success: false,
                data: '',
                code: 200,
                msg: '删除失败，该分类下有产品'
            };
            return false;
        }
        // 删除该分类
        let deleteResult = await proClassifyService.delete(formData.id);
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
            data: '',
            code: 30001,
            msg: '删除失败'
        };
    },
};