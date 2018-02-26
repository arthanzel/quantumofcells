import decode from "jwt-decode";

import auth from "./auth";

export default function token() {
    return decode(auth());
};