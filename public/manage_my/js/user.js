$(function () {
    var myPageNum = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('userTable', data));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(data.total / data.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        // 设置给变量
                        myPageNum = page;
                        // 重新获取数据
                         getData();
                    }
                });

            }
        });
    }
    // 首次调用
    getData();

    


})