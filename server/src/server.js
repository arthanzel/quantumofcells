import express from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const app = express();

const checkJwt = jwt({
    audience: process.env.AUTH_AUDIENCE,
    issuer: process.env.AUTH_ISSUER,
    algorithms: ["RSA256"],

    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH_JWKS_URI
    })
});

app.get("/test", (req, res) => {
    res.send("Hello!");
});
app.get("/test/auth", checkJwt, (req, res) => {
    res.send("Authenticated!");
});

app.use((err, req, res, next) => {
    switch (err.status) {
        case 401:
            res.status(401).json({ error: "401 Not Authorized" });
            break;
        default:
            res.status(500).json({ error: "500 Server Error" });
            break;
    }
});

app.listen(process.env.PORT);
console.log(`Listening on ${process.env.PORT}`);