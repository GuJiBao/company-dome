/**
 * 产品展示页面
 */
const proClassifyService = require("./../../services/productClassify");
const productService = require("./../../services/product");
const newsService = require("./../../services/news");
const contactService = require('./../../services/contact');
const config = require("./../../config");

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
  };
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
 * 产品列表
 */
async function productList(param) {
  // console.log(param);
  let opts = {
    page: param.page || 1,
    pageSize: param.pageSize || 10
  };
  // 如果目录id存在
  if (param.id) {
    opts = {
      ...opts,
      classify: param.id
    };
  }
  let res = await productService.query(opts);
  return res;
}

/**
 * 产品详情
 */
async function productDetail(param) {
  let res = await productService.query({ id: param.id });
  return res;
}

module.exports = {
  product: async ctx => {
    let language = ctx.cookies.get("userLanguage") || config.defaultLanguage;
    let result = await productList(ctx.request.query);
    await ctx.render("product", {
      language,
      productCatalogs: await productCatalog() || {},
      news: await news() || {},
      contact: await contact() || {},
      data: result.data || {},
      pageTotal: result.pageTotal || 0
    });
  },
  detail: async ctx => {
    let language = ctx.cookies.get("userLanguage") || config.defaultLanguage;
    let result = await productDetail(ctx.request.query);
    await ctx.render("productDetail", {
      language,
      productCatalogs: await productCatalog() || {},
      contact: await contact() || {},
      news: await news() || {},
      data: result || {}
    });
  }
};
