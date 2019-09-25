$(function() {
    /**
     * 初始化
     */
    (function() {      
      // 关于我们滚动
      aboutSwiper();
    })();
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
  