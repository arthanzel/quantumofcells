import { parseAuth0Result } from "qoc/authHelper";
import webAuth from "qoc/webAuth";

// TODO: Handle exceptions in the callback
// TODO: Set up config for the client

webAuth.parseHash((err, result) => {
    if (err) {
        console.log(err);
    }

    const userToken = parseAuth0Result(result);
    window.localStorage.setItem("auth0", JSON.stringify(userToken));
    window.location.href = process.env.EDITOR_URL;
});