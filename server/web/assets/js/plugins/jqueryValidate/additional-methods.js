/*!
 * jQuery Validation Plugin v1.14.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2015 Jörn Zaefferer
 * Released under the MIT license
 */
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "./jquery.validate"], factory);
  } else {
    factory(jQuery);
  }
})(function($) {
  $.validator.addMethod(
    "ziprange",
    function(value, element) {
      return this.optional(element) || /^90[2-5]\d\{2\}-\d{4}$/.test(value);
    },
    "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx"
  );
  $.validator.addMethod('isEmail', function(value, element) {
	return this.optional(element) || /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);
  }, '邮箱格式不正确');
});
