$(function() {
    let userLanguage = getCookie('userLanguage');

    // 获取验证码
    $('#code').click(function() {
        var _this = this;
        Http.get('/api/public/getCaptcha').then(function(res) {
            if(res.data.success) {
                $(_this).html(res.data.data);
            } else {
                layer.msg(res.data.msg, {icon: 5});
            }
        });
    });

    // 表单验证
    let flag = true;
    $('#form').validate({
        submitHandler: function(form) {
            // 防止多次次点击
            if(!flag) return false;
            flag = false;
            var formStr = decodeURIComponent($(form).serialize(), true);
            Http.post('/api/feedback/create', Util.formatFormData(formStr)).then(function(res) {
                if(res.data.success) {
                    layer.msg('添加成功', {icon: 6}, function() {
                        // 刷新页面
                        window.location.reload();
                    });
                } else {
                    flag = true;
                    layer.msg(res.data.msg, {icon: 5});
                }
            });
            return false;
        },
        rules: {
            name: {
                required: true,
                rangelength: [2, 50]
            },
            email: {
                required: true,
                isEmail: true
            },
            content: {
                required: true,
                maxlength: 300
            },
            code: {
                required: true
            }
        },
        messages: {
            name: {
                required: feedbackFormMsg[userLanguage].name_req
            },
            email: {
                required: feedbackFormMsg[userLanguage].email_req,
                isEmail: feedbackFormMsg[userLanguage].email_isEmail
            },
            content: {
                required: feedbackFormMsg[userLanguage].content_req,
                maxlength: feedbackFormMsg[userLanguage].content_maxlength
            },
            code: {
                required: feedbackFormMsg[userLanguage].code_req
            }
        },
        ignore: '.ignore'
    });
});