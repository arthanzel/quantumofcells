import { checkSession } from "./authHelper";

window.checkSession = checkSession;

window.printAuth = function printAuth() {
    console.log(JSON.parse(localStorage.getItem("auth0")));
};