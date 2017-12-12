$(function () {
    var mypage = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: mypage,
                pageSize: mypageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('productTmp', data));
                // 分页功能
                $("#product-pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypage, //当前页
                    totalPages: mypageSize, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        mypage= page;
                        getData();
                    }
                });
            }
        })
    }

    getData();
    // 2.上传文件
    $("#fileUpLoad").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log('hahahahah');
            console.log(data);
            console.log(data.result.picAddr);
            // 设置给img
            var $img = $('<img style="width:100px;height:100px;" src="' + data.result.picAddr + '"/>');
            $('form form-group:last').append($img);
        }
    });
    

})