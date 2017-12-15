//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 点击放大镜
$('span.fa-search').on('tap',function(){
    window.location.href="../search.html";
})
// 点击返回按钮
$("span.fa-home").on('tap',function(){
    window.location.href="../index.html";
})
// 点击返回箭头 回到上一次的历史记录
$('span.fa-chevron-left').on('tap',function(){
    window.history.back();
})