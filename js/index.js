/*入口文件，起始*/

let event_manager = require('./event.js');

init();


/*初始化*/
function init() {
    //绑定事件
    event_manager.add_events();
}
