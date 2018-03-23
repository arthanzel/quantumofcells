import { webAuth } from "./qoc/util/authUtils";

window.login = function() {
    webAuth.authorize();
};