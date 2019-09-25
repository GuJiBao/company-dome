import Vue from 'vue';
import ElementUI from 'element-ui';
import('element-ui/lib/theme-chalk/index.css');
import filters from './utils/filters';
import http from './api/http';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';

// 使用element-ui组件
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
Vue.use(ElementUI);

// 配置httpUrl
Vue.prototype.httpUrl = config.serverDomain + '\\';

// 使用fontAwesomeIcon
require('./assets/css/font-awesome.min.css');

// 设置过滤器
for(let [key, filter] of Object.entries(filters)) {
  Vue.filter(key, filter);
}

// 配置axios
Vue.use(http);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')