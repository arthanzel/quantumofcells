import webAuth from "qoc/webAuth";

window.login = function() {
    webAuth.authorize();
};