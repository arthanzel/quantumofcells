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

    if (!process.env.TEST_CLIENT_SECRET) {
        console.error("TEST_CLIENT_SECRET is unset!");
    }

    request.post("https://qoc.auth0.com/oauth/token")
        .set("Content-Type", "application/json")
        .send({
            client_id: process.env.TEST_CLIENT_ID,
            client_secret: process.env.TEST_CLIENT_SECRET,
            audience: process.env.AUTH_AUDIENCE,
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