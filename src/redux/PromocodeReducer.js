import { Fetch_Promocode_Data } from "./Constant"

const initialState = null;

export const PromocodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Promocode_Data:
            return action.data;
        default:
            return state;
    }
}