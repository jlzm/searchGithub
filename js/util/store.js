

        /*往冰箱存*/
  function store_set(key, arr) {
    /*加保鲜膜（JSON化）*/
    let json = JSON.stringify(arr);
    /*存冰箱（状态稳定不轻易改变）*/
    localStorage.setItem(key, json);
  }

  /*从冰箱取*/
  function store_get(key) {
    /*从冰箱取到带保鲜膜的数据*/
    let json = localStorage.getItem(key);
    /*撕膜（将数据转化为JS可以理解的数据类型）*/
    return JSON.parse(json);
  }

  module.exports = {
    store_set: store_set,
    store_get: store_get,
  }
