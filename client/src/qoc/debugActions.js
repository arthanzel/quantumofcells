import { checkSession, login } from "./authHelper";
import store from "./store";

window.checkSession = checkSession;

window.printAuth = function printAuth() {
    console.log(JSON.parse(localStorage.getItem("auth0")));
};

window.setReauth = function setReauth() {
    const state = store.getState();
    let soon = new Date();
    soon.setSeconds(soon.getSeconds() + 60);
    login(state.user.accessToken, soon, state.user.name);
};
