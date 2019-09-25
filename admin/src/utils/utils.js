import { Base64 } from 'js-base64';

/**
 * localStorage的添加 
 */
export function addLocalStorage(key, val) {
    localStorage.setItem(key, val);
}
/**
 * localStorage的获取 
 */
export function getLocalStorage(key) {
    return localStorage.getItem(key);
}
/**
 * localStorage的删除
 */
export function removeLocalStorage(key) {
    if(key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}

/**
 * 加密
 */
export function encode(obj) {
    if (!obj) return '{}';
    return Base64.encode(JSON.stringify(obj));
}

/**
 * 解密
 */
export function decode(str) {
    if (!str) return {};
    return JSON.parse(Base64.decode(str));
}

/**
 * 深拷贝
 */
export function deepCopy(o) {
    if (o instanceof Array) {
        let n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        let n = new Function("return " + o.toString())();
        return n
    } else if (o instanceof Object) {
        let n = {}
        for (let i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}