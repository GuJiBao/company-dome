$(function() {
  // 初始化导航
  initNav();
  // 初始化i18n
  initI18n();

  /**
   * 初始化导航
   */
  function initNav() {
    var nav = $("#nav");
    var page = Util.getQueryString("curPage") || "home";
    nav.find("a[data-page=" + page + "]").addClass("active");
  }

  /**
   * 初始化i18n
   */
  function initI18n() {
    /*执行I18n翻译*/
    execI18n();
    $("#language_en").click(function() {
      getCookie("userLanguage", "en", {
        expires: 30,
        path: "/"
      });
      location.reload();
    });

    $("#language_zhCn").click(function() {
      getCookie("userLanguage", "zhCN", {
        expires: 30,
        path: "/"
      });
      location.reload();
    });

    // /*将语言选择默认选中缓存中的值*/
    // $("#language option[value=" + i18nLanguage + "]").attr("selected", true);

    // /* 选择语言 */
    // $("#language").on("change", function() {
    //   var language = $(this)
    //     .children("option:selected")
    //     .val();
    //   getCookie("userLanguage", language, {
    //     expires: 30,
    //     path: "/"
    //   });
    //   location.reload();
    // });
  }
});
