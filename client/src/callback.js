import webAuth from "qoc/webAuth";

// TODO: Handle exceptions in the callback
// TODO: Set up config for the client

webAuth.parseHash((err, result) => {
    if (err) {
        console.log(err);
    }

    result.expireDate = new Date();
    result.expireDate.setSeconds(result.expireDate.getSeconds() + result.expiresIn);
    window.localStorage.setItem("auth0", JSON.stringify(result));
    window.location.href = "http://lvh.me:8080/editor.html";
});