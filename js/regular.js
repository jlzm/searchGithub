function replace_value(keyword) {
    let str = keyword.replace(/(^\s*)|(\s*$)/g, '');
    return  (str == '' || str == null || str == undefined);
  }

  module.exports = {
    replace_value: replace_value
  }