import { Fetch_Promocode_Data } from "./Constant"

export const SetPromocodeData = (data) => {
    return {
        type: Fetch_Promocode_Data,
        data: data,
    }
}

export const RemovePromocodeData = () => {
    return {
        type: Fetch_Promocode_Data,
        data: null,
    }
}