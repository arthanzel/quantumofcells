import { parseAuth0Result } from "qoc/authHelper";
import webAuth from "qoc/webAuth";

// TODO: Handle exceptions in the callback

webAuth.parseHash((err, result) => {
    if (err) {
        console.error(err);
    }
    console.log(result);

    const userObject = parseAuth0Result(result);
    window.localStorage.setItem("auth0", JSON.stringify(userObject));
    window.location.href = CONFIG.editorUrl;
});