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

                $("#product-pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypage, //当前页
                    totalPages: mypageSize, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = mypage;
                        getData();
                    }
                });
            }
        })
    }

    getData();

    // 分页功能
    // 为分页添加点击事件
    $('#product-pagintor')

})