$(function () {
    var myPage = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: myPage,
                pageSize: mypageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('firstTmp', data));


            }
        });
    }
    getData();
    // 表单验证
    $('form').bootstrapValidator({
        fields: {
            //校验用户名，对应name表单的name属性
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-heart',
                validating: 'glyphicon glyphicon-refresh'
            },
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$('#firstform').serialize(),
            success:function(data){
                console.log('hahahahah');
                console.log(data);
                // 关闭模态框
                $('.modal-add').modal('hide')
                getData();
            }
        })
    });
    

})