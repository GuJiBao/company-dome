/**
 * 自定义过滤器
 */
const moment = require('moment');
export default {
    dateFormat: str => {
        return moment(str).format("YYYY-MM-DD h:mm");
    },
    getChars: (str, index) => {
        index = index || 30;
        if(str.length > index) {
            return str.substr(0, index) + '...';
        }
        return str;
    }
}