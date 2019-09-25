/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function() {
  if (navigator.appName == "Netscape") {
    var navLanguage = navigator.language;
    return navLanguage.substr(0, 2);
  }
  return false;
};

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "en";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ["zhCN", "en"];

/**
 * 执行页面i18n方法
 * @return
 */

var execI18n = function() {
  /*
    首先获取用户浏览器设备之前选择过的语言类型
    */
  if (getCookie("userLanguage")) {
    i18nLanguage = getCookie("userLanguage");
  } else {
    // 获取浏览器语言
    var navLanguage = getNavLanguage();
    if (navLanguage) {
      // 判断是否在网站支持语言数组里
      var charSize = $.inArray(navLanguage, webLanguage);
      if (charSize > -1) {
        i18nLanguage = navLanguage;
        // 存到缓存中
        getCookie("userLanguage", navLanguage);
      }
    } else {
      console.log("not navigator");
      return false;
    }
  }
  /* 需要引入 i18n 文件*/
  if ($.i18n == undefined) {
    console.log("请引入i18n js 文件");
    return false;
  }
  /*
    这里需要进行i18n的翻译
  */
  jQuery.i18n.properties({
    name: 'messages', //资源文件名称
    path: "/web/assets/js/plugins/i18n/"+ i18nLanguage +"/", //资源文件路径
    mode: "map", //用Map的方式使用资源文件中的值
    language: i18nLanguage,
    callback: function() {
      //加载成功后设置显示内容
      var insertEle = $(".i18n");
      insertEle.each(function() {
        // 根据i18n元素的 name 获取内容写入
        $(this).html($.i18n.map[$(this).attr("name")]);
      });
      var insertInputEle = $(".i18n-input");
      insertInputEle.each(function() {
        var selectAttr = $(this).attr("selectattr");
        if (!selectAttr) {
          selectAttr = "value";
        }
        $(this).attr(selectAttr, $.i18n.map[$(this).attr("selectname")]);
      });
    }
  });
};
