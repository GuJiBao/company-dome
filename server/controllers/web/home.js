/**
 * 首页
 */
const systemService = require('./../../services/system');
const proService = require('./../../services/product');
const proClassifyService = require('./../../services/productClassify');
const newsService = require('./../../services/news');
const aboutService = require('./../../services/about');
const contactService = require('./../../services/contact');
const config = require('./../../config');

/**
 * 查找banner
 */
async function banner() {
    return await systemService.bannerQuery();
}

/**
 * 热门产品
 */
async function hotProduct() {
    return await proService.search({ hot: true });
}

/**
 * 产品展示
 */
async function productShow() {
    let opts = {
        page: 1,
        pageSize: 10
    };
    let res = await proService.query(opts);
    return res.data;
}

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
 * 关于我们
 */
async function aboutUs() {
    let res = await aboutService.query();
    return res[0];
}

module.exports = async (ctx) => {
    let language = ctx.cookies.get('userLanguage') || config.defaultLanguage;
    const title = '首页';
    await ctx.render('index', {
        language,
        title,
        banners: await banner(),
        hotProducts: await hotProduct(language),
        productCatalogs: await productCatalog(),
        news: await news(),
        productShow: await productShow(),
        contact: await contact() || {},
        aboutUs: await aboutUs() || {}
    })
};