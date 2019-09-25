/**
 * admin 子路由
 */
const router = require("koa-router")();
const productClassifyController = require("./../controllers/api/productClassify");
const productController = require("./../controllers/api/product");
const newsController = require("./../controllers/api/news");
const feedbackController = require('./../controllers/api/feedback');
const systemController = require('../controllers/api/system');
const aboutController = require('../controllers/api/about');
const contactController = require('../controllers/api/contact');

const routers = router
  .post("/productClassify/create", productClassifyController.create) // 产品分类的添加
  .post("/productClassify/update", productClassifyController.update) // 产品分类的更新
  .get("/productClassify/delete", productClassifyController.delete) // 产品分类的删除
  .post("/product/create", productController.create) // 产品的添加
  .post("/product/update", productController.update) // 产品的更新
  .get("/product/delete", productController.delete) // 产品的删除
  .post("/news/create", newsController.create) // 新闻的添加
  .post("/news/update", newsController.update) // 新闻的更新
  .get("/news/delete", newsController.delete) // 新闻的删除
  .get('/feedback/delete', feedbackController.delete)  // feedback的删除
  .post('/banner/create', systemController.bannerCreate) // banner的添加
  .get('/banner/delete', systemController.bannerDelete) // banner的删除
  .post('/banner/update', systemController.bannerUpdate)  // banner的更新
  .post('/about/save', aboutController.save)  // 关于我们的保存
  .post('/contact/save', contactController.save)  // 联系我们的保存
  module.exports = routers;