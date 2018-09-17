
function send(method, url, on_success) {
    let http = new XMLHttpRequest();
    http.open(method, url);
    http.send();
    http.addEventListener('load', function () {
        let data = JSON.parse(this.responseText);
        on_success(data);
    });
}

module.exports = {
    send: send,
}