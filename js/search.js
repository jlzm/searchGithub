
let send = require('./send')
  , el = require('./element')
  , share = require('./share')
  , pagination = require('./pagination')
  ;

let output = {
    search_user: search_user
}


function search_user(on_succeed, on_fail) {
    share.set_keyword(el.input.value);
    let url = 'https://api.github.com/search/users?q='
            + share.get_keyword()
            + '&page=' 
            + share.get_current_page()
            + '&per_page=' 
            + share.get_limit();
    el.ready_prompt_state();
    pagination.disable();
    send.send('get', url, function (data) {
        el.amount_user(data.total_count);
        if(on_succeed)
            on_succeed(data);
        el.end_prompt_state(share.get_current_page(), share.get_page_amount());
        pagination.show();
        pagination.enable();
    });
   
}


module.exports = output;