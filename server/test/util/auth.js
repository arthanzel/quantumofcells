import config from "config";
import request from "superagent";

let token;

/**
 * Retrieves an access token for a test user.
 * The first time the access token is retrieved, this function calls the authentication server and calls `callback`
 * when the operation completes. For all subsequent calls, this function returns the access token.
 * @param callback Callback for when the authentication step completes. Called only once.
 * @returns {String} The access token, if the user has been authenticated.
 */
export default function auth(callback) {
    if (token) {
        return token;
    }

    request.post("https://qoc.auth0.com/oauth/token")
        .set("Content-Type", "application/json")
        .send({
            client_id: config.get("auth.clientId"),
            client_secret: config.get("auth.clientSecret"),
            audience: config.get("auth.audience"),
            grant_type: "client_credentials",
            scope: "test"
        })
        .then((res) => {
            token = res.body.access_token;
            callback(res.body.access_token);
        })
        .catch((err) => {
            throw new Error(err);
        })
};