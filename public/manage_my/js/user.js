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
            }
        });
    }
    // 首次调用
    getData();
    
    $('.pagination>li>a').click(function () {
        myPageNum = $(this).html();
        // console.log(myPageNum);
        getData();
    })
})