import webAuth from "qoc/webAuth";

webAuth.parseHash((err, result) => {
    window.localStorage.setItem("accessToken", result.accessToken);
    window.localStorage.setItem("idToken", result.idToken);
    window.localStorage.setItem("idPayload", JSON.stringify(result.idTokenPayload));
    let date = new Date();
    date.setSeconds(date.getSeconds() + result.expiresIn);
    window.localStorage.setItem("expires", date.toUTCString());
    window.location.href = "http://localhost:8080/editor.html";
})