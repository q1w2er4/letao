
    // 抽取的函数
    function getHistory(){
        var history = window.localStorage.getItem('search_history');
        // console.log(history);
        if(history == null){
            history == [];
        }else{
            // 如果有,就把字符串转化为数组
            history = JSON.parse(history);
        }
        return history;
    }
    //初始化渲染页面,把历史记录渲染到页面上
    function renderPage(){
        var history = getHistory();
        $('.history-list ul').html(template('searchList',history));
    }

    // 需求一:删除neigroup内容到本地缓存中localstorge
    $('form button').click(function(event){
        var inputValue = $(this).prev().val().trim();
        if(inputValue=="" ){
            event.preventDefault();
            mui.alert('别点啦','发出警告');
            return false;
        }
        // 需求二:获取数据
        var history = getHistory();
        var index= history.indexOf(inputValue);
        if(index != -1){
            // 则表明有值,则把数据提取出来
            index.splice(index,1);
        }
        // 把这条搜索记录追加到记录列表中去
        history.appendTo(inputValue)
        // 数据再包括存到本地缓存,从新渲染页面
        window.localStorage.setItem('inputValue').html();
        renderPage();
    })
    // 需求二  打开页面渲染数据
        renderPage();
    // 点击删除按钮,删除单挑记录,实际上就是删除本地缓存里的数据
    $('.search_list ul').on('click','span.fa-close',function(){
        var history = getHistory();
        var liIndex = $(this).parent().indexOf();
        console.log(liIndex);


    })
   