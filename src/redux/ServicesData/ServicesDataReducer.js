import { Fetch_Services_Data_Screen, Remove_One_Services_Data_Screen, Update_Services_Data_Screen } from "../Constant";

const initialState = [];

export const ServicesDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Services_Data_Screen:
            return action.data;
        case Update_Services_Data_Screen:
            return [...state,...action.data];
        case Remove_One_Services_Data_Screen:
            return state.filter((i)=>i.id != action.data);
        default:
            return state;
    }
}