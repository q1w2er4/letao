$(function () {
    var mypage = 1;
    var mypageSize = 5;

    function getData() {
        // 1.渲染页面
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: mypage,
                pageSize: mypageSize
            },
            success: function (data) {
                // console.log(data);
                $('tbody').html(template('secondTmp', data));
                // 2.分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypage, //当前页
                    totalPages: Math.ceil(data.total / data.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        mypage = page;
                        getData();
                    }
                });

            }
        })
    }
    getData();

    // 2.获取图片,ajax上传文件,图片预览

    $("#fileUpLoad").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log('hahahahah');
            console.log(data);
            console.log(data.result.picAddr);
            // // 设置给img
            // $('form img').attr('src', data.result.picAddr);
            // // 设置给文件路径 input
            // $('input[name=brandLogo]').val(data.result.picAddr);
            // // 人为的更新字段的验证信息
            // $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });



    // 3.渲染该页面的第一分类下拉菜单
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 200
        },
        success: function (data) {
            console.log(data);
            // 代码清空
            $('.dropdown-menu').html('');
            var backdata = data.rows;
            // 点击下拉表单时,循环数据
            for(var i=0;i<backdata.length;i++){
                // console.log(backdata[0]);
                var $li = $("<li><a data-id='"+backdata[i].id+"' href='javascript:void(0);'>"+backdata[i].categoryName+"</a></li>");
                // 添加到ul中
                $('.dropdown-menu').append($li);
            }
        }
    })
    
    // 4.给ul添加点击事件,动态生成时,给父元素添加
    $('.dropdown-menu').on('click', 'a', function () {
       $('.select-value').html($(this).html());
       $('input[name=categoryId]').val($(this).attr('data-id'));
       // 人为的更新状态 为成功
       $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 5.校验表单后,提交表单
    $('form').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [':disabled',':not(:visible)',':hidden'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            categoryId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            brandName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            brandLogo: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addSecondCategory",
            data: $('form').serialize(),
            type: "post",
            success: function (backData) {
                console.log('奶奶个腿');
                console.log(backData);
                // 重新获取数据 页面不会刷新
                getData();

                // 关闭modal
                $('.modal-add').modal('hide');
                // 清空表单数据
                $("form").data('bootstrapValidator').resetForm();
                $('form input').val('');
                $('form img').attr('src', './images/none.png');
                $('.select-value').html('请选择');

                // 刷新页面
                // window.location.reload();
                // window.location.href = window.location.href;

            }
        })


    });
})