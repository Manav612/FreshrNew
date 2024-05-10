import { Fetch_Force_Update } from "./Constant"

const initialState = false;

export const VersionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Force_Update:
            return action.data;
        default:
            return state;
    }
}