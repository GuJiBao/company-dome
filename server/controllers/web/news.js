/**
 * 新闻中心页面
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
 * 新闻列表
 */
async function newsList(param) {
    // console.log(param);
    let opts = {
        page: param.page || 1,
        pageSize: param.pageSize || 10
    }
    let res = await newsService.query(opts);
    return res;
}

/**
 * 新闻详情
 */
async function newsDetail(param) {
    let res = await newsService.query({ id: param.id });
    return res;
}

/**
 * 联系我们
 */
async function contact() {
    let res = await contactService.query();
    return res[0];
}

module.exports = {
    /**
     * 新闻中心页面
     */
    news: async (ctx) => {
        let language = ctx.cookies.get('userLanguage') || config.defaultLanguage;
        let result = await newsList(ctx.request.query);
        await ctx.render('news', {
            language,
            productCatalogs: await productCatalog() || {},
            news: await news() || {},
            contact: await contact() || {},
            newsData: result.data || {},
            pageTotal: result.pageTotal || 0
        })
    },
    detail: async (ctx) => {
        let language = ctx.cookies.get('userLanguage') || config.defaultLanguage;
        let result = await newsDetail(ctx.request.query);
        await ctx.render('newsDetail', {
            language,
            productCatalogs: await productCatalog() || {},
            news: await news() || {},
            contact: await contact() || {},
            data: result || {}
        })
    }
};