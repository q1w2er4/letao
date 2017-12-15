$(function(){
    // 需求一
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(data){
            // console.log(data);
            $('.content_left ul').html(template('categoryTmp',data));
            // 每次页面刷新后默认高亮
            $('.content_left ul li:first-child>a').click();
        }
    })
    // 需求二 点击左侧,渲染对应的右边的页面
    $('.content_left ul').on('click','li>a',function(){

        $(this).parent().addClass('active').siblings().removeClass('active');
        var categoryId = $(this).attr('data-id');
        // console.log(categoryId);
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:categoryId
            },
            success:function(backdata){
                // console.log(backdata);
                $('.content_right ul').html(template('categoryRightTmp',backdata));
            }
        })
    })
    
})