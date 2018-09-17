
/*定义页面中元素*/

let form = document.getElementById('search-form')
    , input = document.getElementById('search-input')   
    , user_list = document.getElementById('user-list')
    , placeholer = document.getElementById('placeholer')
    , pagination_wrap = document.getElementById('pagination-wrap')
    , history_list = document.getElementById('history-list')
    , amount = document.getElementById('amount')
    , toolbar = document.getElementById('toolbar')
    ;

let output = {
    form :form 
  , input :input   
  , history_list: history_list
  , amount_user: amount_user
  , user_list :user_list  
  , placeholer :placeholer  
  , pagination_wrap :pagination_wrap  
  , ready_prompt_state: ready_prompt_state
  , end_prompt_state: end_prompt_state
  }



function amount_user(data){
  amount.innerHTML = '共搜索到' + data + '个github用户';
}



//搜索前状态显示
function ready_prompt_state() {
  placeholer.hidden = true;
}

//搜索后状态显示
function end_prompt_state(page_current, page_amount) {
 if(page_current == page_amount || page_amount == 0)
  placeholer.hidden = false;
}




module.exports = output;
