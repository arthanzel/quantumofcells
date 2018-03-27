import { version } from "../package";
import { webAuth } from "./qoc/util/authUtils";

document.getElementById("version").innerText = version;

window.login = function() {
    webAuth.authorize();
};