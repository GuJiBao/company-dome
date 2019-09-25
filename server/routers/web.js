const router = require('koa-router')();
const home = require('../controllers/web/home');
const productControllers = require('../controllers/web/product');
const newsControllers = require('../controllers/web/news');
const feedback = require('../controllers/web/feedback');
const about = require('../controllers/web/about');
const contact = require('../controllers/web/contact');

const routers = router
    .get('/', home)
    .get('product', productControllers.product)
    .get('productDetail', productControllers.detail)
    .get('news', newsControllers.news)
    .get('newsDetail', newsControllers.detail)
    .get('feedback', feedback)
    .get('about', about)
    .get('contact', contact)

module.exports = routers;