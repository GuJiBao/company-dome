$(function() {
  /**
   * 初始化
   */
  (function() {
    // banner轮播
    bannerSwiper();
    // 热门产品滚动
    hotProductsSwiper();
    // 关于我们滚动
    aboutSwiper();
  })();
  /**
   * 热门产品滚动
   */
  function hotProductsSwiper() {
    var swiper = new Swiper("#hotProSwiper", {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        disableOnInteraction: false
      },
      centeredSlides: true
    });
  }

  /**
   * banner轮播
   */
  function bannerSwiper() {
    var bannerSwiper = new Swiper("#bannerSwiper", {
      speed: 1000,
      longSwipes: false,
      loop: true,
      autoplay: {
        disableOnInteraction: false
      },
      navigation: {
        nextEl: "#bannerSwiper_prev",
        prevEl: "#bannerSwiper_next"
      },
      pagination: {
        el: "#bannerSwiper_page",
        clickable: true
      },
      on: {
        autoplayStop: function() {
          this.$el.find(".banner-icon-videoplay").addClass("stop-status");
        },
        autoplayStart: function() {
          this.$el.find(".banner-icon-videoplay").removeClass("stop-status");
        }
      }
    });

    bannerSwiper.$el.find(".banner-icon-videoplay").on("click", function() {
      if (bannerSwiper.autoplay.running) {
        bannerSwiper.autoplay.stop();
      } else {
        bannerSwiper.autoplay.start();
      }
    });
  }

  /**
   * 关于我们轮播
   */
  function aboutSwiper() {
    var mySwiper = new Swiper ('#aboutSwiper', {
      loop: true, // 循环模式选项
      
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })        
  }


});
