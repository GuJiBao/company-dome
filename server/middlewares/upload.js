
const multer = require('koa-multer');//加载koa-multer模块
const path = require('path')
const fs = require('fs');

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean}       创建目录结果
 */
function mkdirsSync(dirname) {
  if(fs.existsSync(dirname)) {
    return true;
  } else {
    if(mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 文件上传
// 配置
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    let type = req.body.type;
    let catalog = 'public/uploads/' + type;
    let mkdirResult = mkdirsSync(catalog);
    cb(null, catalog)
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
// 加载配置
module.exports = multer({ storage: storage });