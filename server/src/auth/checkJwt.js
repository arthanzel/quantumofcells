import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

/**
 * Middleware that checks a JSON Web Token provided in the request's <code>Authorization</code> header.
 * The JWT must have a valid signature, must not be expired, must match the API's audience, and must match the API's issuer.
 * The audience and issuer are defined in the AUTH_AUDIENCE and AUTH_ISSUER environment variables.
 * If the JWT is invalid, a 401 is immediately issued.
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next Next middleware.
 */
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

    jwtMiddleware(req, res, next);
}