import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

export default function checkJwt(req, res, next) {
    const jwtMiddleware = jwt({
        audience: process.env.AUTH_AUDIENCE,
        issuer: process.env.AUTH_ISSUER,
        algorithms: ["RS256"],

        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: process.env.AUTH_JWKS_URI
        })
    });

    if (process.env.NODE_ENV === "development") {
        // TODO Allow a test user who doesn't need to be authenticated
    }
    jwtMiddleware(req, res, next);
}