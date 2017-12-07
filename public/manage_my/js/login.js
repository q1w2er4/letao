$(function () {
    $('form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在6到30之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到30之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log('看这里,看这里...');
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            datatype: 'json',
            data: $('form').serialize(),
            success: function (backdata) {

                if (backdata.success == true) {
                    location.href = "./index.html"
                } else {
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    if (data.error == 1000) {
                        $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
            }

        })
    })
})