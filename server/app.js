const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const render = require('koa-art-template');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MongoStore = require('koa-generic-session-mongo');
const logger = require('koa-logger');
const path = require('path');
const artTemplateFilter = require('./utils/artTemplateFilter'); // 载入art-teplate过滤器

// 配置
const config = require('./config');
// 获取路由
const routers = require('./routers/index');

// 使用cors实现跨域请求
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return 'http://localhost:9005';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 配置web渲染引擎
render(app, {
    root: path.join(__dirname, config.renderWebPath),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production',
    imports: artTemplateFilter,
    escape: false
});

// 配置web静态资源路径
app.use(static(
    path.join(__dirname, config.staticPath)
));

// 错误捕获
const middlewares = require('./middlewares');
app.use(middlewares.errorHandler);

// 日志
app.use(logger());

// 使用ctx.body解析中间件
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));

// 配置session
app.use(session({
    key: 'USER_SID',
    store: new MongoStore({
        url: config.mongodb
    })
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

mongoose.connect(config.mongodb, {
    useNewUrlParser: true
}, err => {
    if (err) {
        console.log(err);
        return false;
    }
    app.listen(config.serverPort, () => {
        console.log(`[blog] start-quick is starting at port ${config.serverPort}`)
    });
});
