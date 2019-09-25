/**
 * 用户业务操作
 */
const UserModel = require('../models/User');
const crypto = require('crypto');
const Base64 = require('js-base64').Base64;
const jwt = require('jsonwebtoken');
const config = require('../config');
const validator = require('../utils/validator');

const user = {
    /**
     * 数据库创建用户
     * @param {object} userInfo 用户信息
     * @return {object}         创建结果
     */
    async create(userInfo) {
        return await new UserModel(userInfo).save();
    },
    /**
     * 查询一个存在用户的数据
     * @param {object} options 查找条件参数
     * @return {object|null}   查找结果
     */
    async getExistOne(opts) {
        return await UserModel.findOne(opts);
    },
    /**
     * 校验注册用户数据
     * @param {object} userInfo 用户注册数据
     * @return {object}         校验结果
     */
    validatorSignup(userInfo) {
        if (!validator.isUserName(userInfo.userName)) {
            return {
                success: false,
                data: '',
                code: 30001,
                msg: '用户名由5~16位字符组成'
            };
        }
        if (!validator.isPassword(userInfo.password)) {
            return {
                success: false,
                data: '',
                code: 30001,
                msg: '密码由8~50位字符组成'
            };
        }
        return {
            success: true
        };
    },
    /**
     * 生成token
     * @type {String}
     */
    async createToken(data) {
        let token = jwt.sign({
            exp: config.tokenExp,
            data: data
        }, config.tokenKey);
        return token;
    },
    /**
     * 密码加密
     * @type {[type]}
     */
    async encrypt(base64Random, password) {
        // 2.将第一步的结果与用户输入的密码拼接
        let newPas = base64Random + password;
        // 3.将第二步的结果进行MD5加密
        let md5 = crypto.createHash("md5");
        let md5Pas = md5.update(newPas).digest("hex");
        // 4.将第三步进行base64加密
        let base64Md5 = Base64.encode(md5Pas);
        // 5.将第一步与第四步拼接
        return await base64Random + base64Md5;
    }
};

module.exports = user;