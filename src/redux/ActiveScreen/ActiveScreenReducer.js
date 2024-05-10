import { Fetch_Active_Screen } from "../Constant";

export const ActiveScreenReducer = (state = "", action) => {
    switch (action.type) {
        case Fetch_Active_Screen:
            return action.data;
        default:
            return state;
    }
}