/**
 * 项目配置
 */
module.exports = {
    serverPort: '80', // 服务器端口
    mongodb: 'mongodb://localhost:27017/company', // mongodb链接地址
    renderWebPath: './web/views', // web模板路径
    staticPath: './', // web静态资源路径
    tokenKey: 'sdf!sd_tokenkeyabc',
    tokenExp: Math.floor(Date.now() / 1000) + (60 * 60),
    defaultLanguage: 'en'
};