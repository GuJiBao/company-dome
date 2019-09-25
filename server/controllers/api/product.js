const fs = require('fs');
const proService = require('./../../services/product');

module.exports = {
    /**
     * 添加产品
     * @param  {obejct} ctx 上下文对象
     */
    async create(ctx) {
        let formData = ctx.request.body;
        let { name, enName, classify, no, unit, image, hot, details, enDetails } = formData;
        // 校验数据
        let validateResult = proService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }
        // 查找该产品分类是否已存在数据库中
        let findResult = await proService.getExistOne({
            '$or': [{name: name}, {enName: enName}]
        });
        if(findResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '产品已存在'
            };
            return false;
        }
        // 添加产品
        let createResult = await proService.create({
            name: name,
            enName: enName,
            classify: classify,
            no: no,
            unit: unit,
            image: image,
            hot: hot,
            details: details,
            enDetails: enDetails
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
     * 产品的查询
     * @param  {obejct} ctx 上下文对象
     */
    async query(ctx) {
        let formData = ctx.request.query;
        try {
            let findResult = await proService.query(formData);
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
     * 产品的更新
     * @param {object} ctx 上下文对象 
     */
    async update(ctx) {
        let formData = ctx.request.body;
        let { id, name, enName, classify, no, unit, image, hot, details, enDetails } = formData;
        
        // 校验数据
        let validateResult = proService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }

        // 查找该产品是否已存在数据库中
        let findResult = await proService.getExistOne({
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
        let updateResult = await proService.update({
            _id: id
        }, {
            name: name,
            enName: enName,
            classify: classify,
            no: no,
            unit: unit,
            image: image,
            hot: hot,
            details: details,
            enDetails: enDetails,
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
     * 产品的删除
     * @param {object} ctx 上下文对象
     */
    async delete(ctx) {
        let formData = ctx.request.query;
        let id = formData.id;
        // 查找该产品信息
        let findResult = await proService.getExistOne({
            _id: id
        });
        if(findResult) {
            let path = findResult.image.path;
            if(fs.existsSync(path)) {
                // 删除图片
                fs.unlink(path, err => {
                    if (err) throw err;
                });
            }
        }
        let deleteResult = await proService.delete(formData.id);
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