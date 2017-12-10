$(function(){
    // 判断是否登陆
    // [判断用户是否登陆]
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(data){
            console.log(data);
            if(data.)
        }
    })









    //1. 展开收起侧边栏
    $('.main-head .main-hl').click(function () {
        $('.aside').toggle();
        $('.main').toggleClass("fullscreen");
    })
    // 2.模态框弹出
    $('#mian-hr').click(function(){
        $('.modal-sure').modal('show');
    })
    $('.modal-sure  .modal-footer').on('click','button:nth-of-type(2)',function(){
        $('.modal-sure').modal('hide');
        console.log('我是common');
        window.location.href="./login.html";
    })
    // 侧边栏收起
    $('.list li:eq(1)>a').click(function(){
        $(this).next('div').slideToggle();
    })
})