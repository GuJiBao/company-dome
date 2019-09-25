import axios from 'axios';
import config from '@/config';
import { getLocalStorage } from '@/utils/utils';

window.console.log(process.env.NODE_ENV);

const http = axios.create({
    baseURL: config.serverDomain,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = getLocalStorage('token');
    if(token) {
        config.headers.common['Authorization'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default {
    install(Vue) {
        Vue.prototype.$http = http;
        Vue.http = http;
    },
    $http: http
}

export const $http = http;