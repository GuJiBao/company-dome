/**
 * restful api 子路由
 */
const router = require("koa-router")();
const upload = require("./../middlewares/upload");

const userController = require("./../controllers/api/user");
const uploadsController = require("../controllers/api/upload");
const captchaController = require('../controllers/api/captcha');
const productClassifyController = require("./../controllers/api/productClassify");
const productController = require("./../controllers/api/product");
const newsController = require("./../controllers/api/news");
const feedbackController = require('./../controllers/api/feedback');
const systemController = require('../controllers/api/system');
const aboutController = require('../controllers/api/about');
const contactController = require('../controllers/api/contact');

const routers = router
  .post("/user/signin", userController.signin) // 登录
  // .post("/user/signup", userController.signup) // 注册
  .get('/public/getCaptcha', captchaController.create) // 生成验证码
  .post("/public/uploads", upload.single("file"), uploadsController.upload) // 图片上传
  .post("/public/delImage", uploadsController.delImage) // 图片删除
  .get("/productClassify/query", productClassifyController.query) // 产品分类的查询
  .get("/product/query", productController.query) // 产品的查询
  .get("/news/query", newsController.query) // 新闻的查询
  .post('/feedback/create', feedbackController.create)  // feedback的添加
  .get('/feedback/query', feedbackController.query) // feedback的查询
  .get('/banner/query', systemController.bannerQuery) // banner的查询
  .get('/about/query', aboutController.query) // 关于我们的查询
  .get('/contact/query', contactController.query) // 联系我们的查询

module.exports = routers;
