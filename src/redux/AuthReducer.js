import { Fetch_Auth_Token } from "./Constant"

const initialState = [];

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Auth_Token:
            return action.data;
        default:
            return state;
    }
}