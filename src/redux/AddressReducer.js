import { Address } from "./Constant"

const initialState = null;

export const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case Address:
            return action.data;
        default:
            return state;
    }
}