import { checkSession, login } from "./authHelper";
import channel from "./channel";
import store from "./store";

window.checkSession = checkSession;

window.printAuth = function printAuth() {
    console.log("From localStorage:", JSON.parse(localStorage.getItem("auth0")));

    const user = store.getState().user;
    if (user) {
        console.log("From store: ", user);
    }
    else {
        console.log("No user logged in");
    }
};

window.toast = function toast(msg) {
    channel.publish(channel.TOAST, msg);
};

window.setReauth = function setReauth() {
    const state = store.getState();
    let soon = new Date();
    soon.setSeconds(soon.getSeconds() + 60);
    store.getState().user.expireDate = soon;
    // Wait for checkSession
};
