import { Fetch_Mode } from "./Constant"

const initialState = [];

export const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Mode:
            return action.data;
        default:
            return state;
    }
}