import request from "superagent";

let token;

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
            client_id: "LpQnxgyKxQm2oJaPABp2OCJANNrQY3NC",
            client_secret: process.env.TEST_CLIENT_SECRET,
            audience: "https://api.quantumofcells.com",
            grant_type: "client_credentials"
        })
        .then((res) => {
            token = res.body.access_token;
            callback(res.body.access_token);
        })
        .catch((err) => {
            throw new Error(err);
        })
};