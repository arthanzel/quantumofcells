import actions from "./actions";
import uid from "../qoc/uid";

export default function(user = {}, action) {
    switch (action.type) {
        case actions.LOGIN:
            return {
                accessToken: action.user.accessToken,
                expireDate: new Date(action.user.expireDate),
                name: action.user.name
            };
        case actions.LOGOUT:
            return {};
        default:
            return user;
    }
};