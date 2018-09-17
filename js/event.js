
/*事件处理*/
let el = require('./element')
  , share = require('./share')
  , search = require('./search')
  , regular = require('./regular')
  , history = require('./history')
  , pagination = require('./pagination')
  , keyword
  ;

function add_events() {
    detect_submit();
    detect_pageBtn()
    detect_input();
}


pagination.init({
    pagination_wrap: el.pagination_wrap
  , on_change_page_current: on_change_page_current
});

//当前页码改变的时候
function on_change_page_current(page, e){
    console.log(page);
    if(page == share.get_current_page())
        return;
    share.set_current_page(page);
    search.search_user(on_search_succeed);
}



/*表单提交事件*/
function detect_submit() {
    el.form.addEventListener('submit', function (e) {
        e.preventDefault();
            keyword = el.input.value;
            if(regular.replace_value(keyword))
                return;

            share.reset_page();
            share.reset_user_list(el.user_list);  
            history.add(el.input.value);
            pagination.hide();
            search.search_user(on_search_succeed);
    });
}

//当加载成功
function on_search_succeed(data){
    share.set_amount(data.total_count);
    share.set_user_list(data.items);
    pagination.set_amount_and_limit(share.get_amount(), share.get_limit());
    share.reset_user_list(el.user_list); 
    render_user_list();
}


//显示隐藏 history-list 事件
function detect_pageBtn(){
    document.addEventListener('click', function (e){
        if(!e.target.closest('#search-input')){
            history.hide_histoty();  
        }
      });
}

// 导入 history 元素和事件 （回调）
history.init({
    history_list: el.history_list
  , input: el.input
  , click_history: click_history
 });
 
 // 点击 history 触发搜索事件
 function click_history(key) {
    search.search_user(on_search_succeed);
 }
 
 // 点击 input 搜索框显示 history-list
 function detect_input(){
     el.input.addEventListener('click', function (e) {
        if(el.history_list.innerHTML == ''){
            history.hide_histoty();
            return;
        }
        history.show_histoty();
    });
 }
 
/*渲染用户列表*/
function render_user_list() {
    let html = '';
    share.get_user_list().forEach(function (user) {
      html+=
        `<div class="user">
          <a class="avatar" target="_blank" href="${user.html_url}">
            <img src="${user.avatar_url}">
          </a>
          <div class="info">
            <div class="username">${user.login}</div>
            <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
          </div>
        </div>
        `
      ;
      el.user_list.innerHTML = html;
    });
  }


module.exports = {
    add_events: add_events,
}