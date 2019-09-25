/**
 * 关于我们页面
 */
const proClassifyService = require('./../../services/productClassify');
const newsService = require('./../../services/news');
const contactService = require('./../../services/contact');
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

module.exports = async (ctx) => {
    let language = ctx.cookies.get('userLanguage') || config.defaultLanguage;
    await ctx.render('contact', {
        language,
        productCatalogs: await productCatalog() || {},
        news: await news() || {},
        contact: await contact() || {},
        data: await contact() || {}
    })
};