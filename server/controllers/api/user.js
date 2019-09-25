const userService = require('./../../services/user');
const Base64 = require('js-base64').Base64;
const random = require('./../../utils/random');
const User = require('./../../config/user');

module.exports = {
    /**
     * 用户注册
     * @param  {obejct} ctx 上下文对象
     */
    async signup(ctx) {
        let formData = ctx.request.body;
        let userName = formData.userName;
        let password = formData.password;

        // 校验注册数据
        let validateResult = userService.validatorSignup(formData);
        if (!validateResult.success) {
            ctx.body = validateResult;
            return false;
        }

        // 查询该用户在数据库中是否已存在
        let findResult = await userService.getExistOne({
            userName: userName
        });
        if (findResult) {
            ctx.body = {
                success: false,
                data: '',
                code: 30002,
                msg: '用户已存在'
            };
            return false;
        }

        // 1.生成8位的随机数
        let randomWord = random(false, 8);
        // 2.对生成的随机数加密
        let base64Random = Base64.encode(randomWord);

        // 进行加密处理后的密码
        let lastPassword = await userService.encrypt(base64Random, password);

        // 创建用户
        let createResult = await userService.create({
            userName: userName,
            password: lastPassword
        });
        if(!createResult._id) {
            ctx.body = {
                success: false,
                data: '',
                code: 30003,
                msg: '用户注册失败'
            };
            return false;
        }

        ctx.body = {
            success: true,
            data: '',
            code: 30000,
            msg: '用户注册成功'
        };
    },
    /**
     * 用户登录
     * @param  {obejct} ctx 上下文对象
     */
    async signin(ctx) {
        let formData = ctx.request.body;
        let userName = formData.userName;
        let password = formData.password;

        // 校验数据
        // let validateResult = userService.validatorSignup(formData);
        // if (!validateResult.success) {
        //     ctx.body = validateResult;
        //     return false;
        // }

        // 检查用户名是否正确
        if(userName !== User.userName) {
            ctx.body = {
                success: false,
                data: '',
                code: 30001,
                msg: '用户不存在'
            };
            return false;
        }

        // 查询改用户在数据库中是否已存在
        // let findResult = await userService.getExistOne({
        //     userName: userName
        // });
        // if(!findResult) {
        //     ctx.body = {
        //         success: false,
        //         data: '',
        //         code: 30001,
        //         msg: '用户不存在'
        //     };
        //     return false;
        // }
        // if(!findResult.isAdmin) {
        //     ctx.body = {
        //         success: false,
        //         data: '',
        //         code: 30002,
        //         msg: '不是管理员无权登录'
        //     };
        //     return false;
        // }

        // 获取到的密码截取前面随机数通过base64加密的结果
        let base64Random = User.password.substring(0, 12);
        // 进行加密处理后的密码
        let lastPassword = await userService.encrypt(base64Random, password);
        // 校验密码
        if(User.password !== lastPassword) {
            ctx.body = {
                success: false,
                data: '',
                code: 30001,
                msg: '密码错误！',
            };
            return false;
        }
        
        // 创建token
        let token = await userService.createToken(User.userName);
        ctx.body = {
            accessToken: token,
            success: true,
            data: {                
                userName: User.userName,
                login_at: +new Date() 
            },
            code: 30000,
            msg: '登录成功'
        };
    },

};