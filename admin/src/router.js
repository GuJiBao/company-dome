import Vue from "vue";
import Router from "vue-router";
import { getLocalStorage } from '@/utils/utils';

Vue.use(Router);

function lazyLoad(path) {
  return () => import(`@/${path}.vue`);
}

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "layout",
      path: "/",
      component: lazyLoad("views/Layout"),
      redirect: "/product",
      children: [
        {
          path: "/productClassify",
          component: lazyLoad("views/ProductClassify")
        },
        {
          path: "/product",
          component: lazyLoad("views/Product")
        },
        {
          path: "/news",
          component: lazyLoad('views/News')
        },
        {
          path: '/feedbacks',
          component: lazyLoad('views/Feedbacks')
        },
        {
          path: '/banner',
          component: lazyLoad('views/Banner')
        },
        {
          path: '/about',
          component: lazyLoad('views/About')
        },
        {
          path: '/aboutEdit',
          component: lazyLoad('views/AboutEdit')
        },
        {
          path: '/contact',
          component: lazyLoad('views/Contact')
        }
      ]
    },
    // {
    //   path: "/register",
    //   component: lazyLoad("views/Register")
    // },
    {
      path: "/login",
      component: lazyLoad("views/Login")
    }
  ]
});

router.afterEach((to) => {
  let token = getLocalStorage('token');
  // 判断是否登录
  if(!token && to.path !== '/register') {
    router.push('/login');
    return false;
  }
})

/**
 * 路由信息配置
 */
export default router;
