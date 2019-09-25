const feedbackService = require('../../services/feedback');

module.exports = {
    /**
     * feedbook的添加
     * @param  {obejct} ctx 上下文对象
     */
    async create(ctx) {
        let formData = ctx.request.body;
        let { name, companyName, address, tel, fax, email, website, skype, content, code } = formData;
        // 校验数据
        let validateResult = feedbackService.validatorProClassify(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }
        // 校验验证码
        let validateCaptchaResult = feedbackService.validateCaptcha(ctx, code);
        if (!validateCaptchaResult.success) {
            ctx.body = validateCaptchaResult;
            return false;
        }
        // 添加
        let createResult = await feedbackService.create({
            name: name,
            companyName: companyName,
            address: address,
            tel: tel,
            fax: fax,
            email: email,
            website: website,
            skype: skype,
            content: content
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
     * feekback的查询
     * @param  {obejct} ctx 上下文对象
     */
    async query(ctx) {
        let formData = ctx.request.query;
        try {
            let findResult = await feedbackService.query(formData);
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
     * 产品的删除
     * @param {object} ctx 上下文对象
     */
    async delete(ctx) {
        let formData = ctx.request.query;
        let deleteResult = await feedbackService.delete(formData.id);
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
}