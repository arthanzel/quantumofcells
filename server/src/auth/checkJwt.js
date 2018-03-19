import config from "config";
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
        audience: config.get("auth.audience"),
        issuer: config.get("auth.issuer"),
        algorithms: ["RS256"],

        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: config.get("auth.jwksUri")
        })
    });

    jwtMiddleware(req, res, function(err) {
        // The `next` function in middlewares takes a single argument: an error object.
        // If a middleware encounters an error, the error should be passed into the callback for proper routing.
        // Don't throw errors here - Express might not handle them.

        if (err) {
            next(err);
            return;
        }

        if (process.env.NODE_ENV !== "test" &&
                req.user &&
                req.user.azp === config.get("auth.clientId")) {
            // IMPORTANT!
            // Do not accept tokens requested by TEST_CLIENT_ID unless we are testing.
            // Otherwise, an attacker can request an access token through the test harness and use it to access the API.
            // TODO: Accept tokens only from the SPA client in production
            next({ status: 401 });
            return;
        }

        next();
    });
}