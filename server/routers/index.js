/**
 * 整合所有子路由
 */
const router = require('koa-router')();
const web = require('./web');
const api = require('./api');
const admin = require('./admin');

const middlewares = require('./../middlewares');

router.use('/', web.routes(), web.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/admin', admin.routes(), middlewares.isLogin, admin.allowedMethods());

module.exports = router;