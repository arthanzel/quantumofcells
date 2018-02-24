import { WebAuth } from "auth0-js";

export default new WebAuth({
    audience: "https://api.quantumofcells.com",
    clientID: "IIlRrl3lLjVaHqJezrqVN3C3YoM1x5Fw",
    domain: "qoc.auth0.com",
    redirectUri: process.env.CALLBACK_URI,
    responseType: "token id_token",
    scope: "openid email profile"
});