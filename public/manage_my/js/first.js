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
                // 2.分页插件的使用
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(data.total / data.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPage = page;
                        getData();
                    }
                });
            }
        });
    }
    // 1.渲染页面
    getData();
    // 2.表单验证
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
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#firstform').serialize(),
            success: function (data) {
                console.log('hahahahah');
                console.log(data);
                // 关闭模态框
                $('.modal-first-add').modal('hide')
                getData();
            }
        })
    });
    //3.



})