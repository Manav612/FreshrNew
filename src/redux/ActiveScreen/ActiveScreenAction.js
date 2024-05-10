import { Fetch_Active_Screen } from "../Constant"

export const setActiveScreen = (data) => {
    return {
        type: Fetch_Active_Screen,
        data: data,
    }
}