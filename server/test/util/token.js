import decode from "jwt-decode";

import auth from "./auth";

/**
 * Decodes the access token provided by `util/auth`.
 * The test user must be authenticated for this function to work.
 * Don't call this before `auth()` has had a chance to call its callback parameter.
 * @returns {Object} Decoded access token.
 */
export default function token() {
    return decode(auth());
};