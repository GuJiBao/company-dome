module.exports = {
  /**
   * 校验用户名
   */
  isUserName: (value) => {
    return value.length >= 5 && value.length <= 16;
  },
  /**
   * 校验手机号码
   */
  isPhone: (value) => {
    return /^1\d{2}\d{8}$/.test(value);
  },
  /**
   * 校验登录密码
   */
  isPassword: (value) => {
    return /^(?![^a-zA-Z]+$)(?!\D+$).{8,50}$/.test(value)
  },
  /**
   * 校验身份证号码
   */
  isIdCard: (value) => {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)
  },
  /**
   * 校验电子邮箱
   */
  isEmail: (value) => {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)
  }
};