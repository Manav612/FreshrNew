import { Fetch_Font_Size } from "./Constant"

const initialState = [];

export const FSReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Font_Size:
            return action.data;
        default:
            return state;
    }
}