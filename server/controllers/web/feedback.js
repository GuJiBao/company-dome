/**
 * feedback页面
 */
const proClassifyService = require('./../../services/productClassify');
const newsService = require('./../../services/news');
const contactService = require('./../../services/contact');
const captchaService = require('../../services/captcha');
const config = require('./../../config');

/**
 * 产品目录
 */
async function productCatalog() {
    return await proClassifyService.query();
}

/**
 * 新闻中心
 */
async function news() {
    let opts = {
        page: 1,
        pageSize: 5
    }
    let res = await newsService.query(opts);
    return res.data;
}

/**
 * 联系我们
 */
async function contact() {
    let res = await contactService.query();
    return res[0];
}

/**
 * 生成验证码
 */
async function createSvgCaptcha() {
    let createResult = await captchaService.create();
    if(!createResult.success) {
        return {
            img: '',
            code: ''
        }
    }
    let { img, text } = createResult.data;
    return {
        img: img,
        code: text
    }
}

module.exports = async (ctx) => {
    let language = ctx.cookies.get('userLanguage') || config.defaultLanguage;
    let captcha = await createSvgCaptcha();
    // 保存验证码到cookies
    ctx.cookies.set('captcha', captcha.code, {maxAge: 360000, httpOnly: true});
    await ctx.render('feedback', {
        language,
        productCatalogs: await productCatalog() || {},
        news: await news() || {},
        contact: await contact() || {},
        captcha: captcha.img
    })
};