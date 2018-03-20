import * as statusCodes from "http-status-codes";

import makeToast from "./makeToast";

export function handleCommonErrors(err) {
    switch (err.status) {
        case statusCodes.UNAUTHORIZED:
            makeToast("You must be logged in to do this");
            break;
    }
}