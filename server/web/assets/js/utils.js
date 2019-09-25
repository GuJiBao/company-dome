var Util = {
    /**
     * 获取url的参数值
     */
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    /**
     * 格式化表单数据
     */
    formatFormData(data) {
        if(!data) return {};
        var obj = {};
        data.split('&').forEach(function(item) {
            var arr = item.split('=');
            obj[arr[0]] = arr[1];
        });
        return obj;
    }
};

/**
 * cookie操作
 */
var getCookie = function(name, value, options) {
    if (typeof value != "undefined") {
        // name and value given, set cookie
        options = options || {};
        if (value === null) {
        value = "";
        options.expires = -1;
        }
        var expires = "";
        if (
        options.expires &&
        (typeof options.expires == "number" || options.expires.toUTCString)
        ) {
        var date;
        if (typeof options.expires == "number") {
            date = new Date();
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        } else {
            date = options.expires;
        }
        expires = "; expires=" + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? "; path=" + options.path : "";
        var domain = options.domain ? "; domain=" + options.domain : "";
        var s = [cookie, expires, path, domain, secure].join("");
        var secure = options.secure ? "; secure" : "";
        var c = [name, "=", encodeURIComponent(value)].join("");
        var cookie = [c, expires, path, domain, secure].join("");
        document.cookie = cookie;
    } else {
        // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
            }
        }
        }
        return cookieValue;
    }
};

var Http = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// 添加请求拦截器
Http.interceptors.request.use(function (config) {
    // var userLanguage = getCookie('userLanguage') || 'en';   // 默认英文
    // if(userLanguage) {
    //     config.data.language = userLanguage;
    // }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 分页操作
var PageHandle = function(opts) {
    var page = opts.page || 1;
    var pageSize = opts.pageSize || 10;
    var url = window.location.href.split('?')[0];
    var curPage = Util.getQueryString('curPage');
    var id = Util.getQueryString('id');
    if(curPage) {
        url = url + '?curPage=' + curPage + '&page=' + page;
    } else {
        url = url + '?page=' + page;
    }
    if(pageSize) {
        url = url + '&pageSize=' + pageSize;
    }
    if(id) {
        url = url + '&id=' + id;
    }
    window.location.href = url;
}