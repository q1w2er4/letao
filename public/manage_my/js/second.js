$(function(){
    var mypage =1;
    var mypageSize = 5;
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:mypage,
            pageSize:mypageSize
        },
        success:function(data){
            console.log(data);
        }
    })
})