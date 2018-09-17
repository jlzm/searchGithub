
//获取模块文件
let helper = require('./util/helper')
  , store = require('./util/store')
  ;
  
let list= []  // list 是一个 history 存值数组
  , history_list      // history_list 容器
  , input
  , click_history   // 回调函数 触发点击 history 的方法
  , click_delete // 回调函数  触发点击删除 history 的方法
  ; 

  //模块出口
let output = {
    init: init
  , add: add
  , show_histoty: show_histoty
  , hide_histoty: hide_histoty
}


function init(config){
    history_list = config.history_list;
    input = config.input;
    click_history = config.click_history;
    click_delete = config.click_delete;
    
    sync_to_ladle();
    sync_to_sore();
    console.log(list);
    if(list.length == 0)
    return
    render();
}



function  reset_history(){
    list = [];
    history_list.innerHTML = '';
    sync_to_sore()
    hide_histoty();  
}

// 删除 history 的方法
function remove(keyword){               
    helper.find_and_delete(list, keyword);    // 判断传进的 history 是否在 list 数组里面, 在里面就删除对应的 history

    render();                          
    sync_to_sore();
    console.log(list.length);
    if(list.length == 0)
        reset_history()   ;              
}

// 把 history 添加进 list 数组里面
function add(keyword){
    sync_to_sore();
    helper.find_and_delete(list, keyword); 

    list.unshift(keyword);
    render();
    sync_to_sore();
}

 // 渲染 history 容器里的数据
function render(){
    history_list.innerHTML = '';
    list.forEach(function (keyword){
        let el_history = document.createElement('div');
        el_history.innerHTML = 
        `
        <div class="text">${keyword}</div>
        <div class="tool">
            <span class="delete">删除</span>
        </div>
        `
        ;
        el_history.classList.add('history');
        history_list.appendChild(el_history);

        let del_history = el_history.getElementsByClassName('delete')[0];

        el_history.addEventListener('click', function(e){
            e.stopPropagation();
            if(click_history){
                input.value = keyword;
                click_history(keyword, e);
                hide_histoty();  
            }     
        });

        del_history.addEventListener('click', function(e){
            e.stopPropagation();
            if(click_delete)
            click_delete(keyword, e);
        
            remove(keyword);
        });

        if(history_list.innerHTML == '')
            hide_histoty();
    });
    let clear_history = document.createElement('div');
    clear_history.innerHTML = '清空历史纪录';
    clear_history.classList.add('clear-histoty');
    history_list.appendChild(clear_history);

    clear_history.addEventListener('click', function(e){
        e.stopPropagation();
        reset_history();
    });

}


//  把 list 数组 存储进 localStorage 里面 [用 JSON.stringify() 方法存储]
function sync_to_sore(){
    store.store_set('asam', list);
}

// 取出 localStorage 里面的 list 数组 [用 JSON.parse() 方法取出]
function sync_to_ladle(){
    list = store.store_get('asam') || [];
}

function show_histoty(){
    history_list.hidden = false;
}

function hide_histoty(){
    history_list.hidden = true;
}

module.exports = output;