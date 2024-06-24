import { Fetch_Services_Data_Screen, Remove_One_Services_Data_Screen, Update_Services_Data_Screen } from "../Constant"

export const SetServiceData = (data) => {
    return {
        type: Fetch_Services_Data_Screen,
        data: data,
    }
}
export const UpdateServiceData = (data) => {
    return {
        type: Update_Services_Data_Screen,
        data: [data],
    }
}
export const RemoveOneServiceData = (data) => {
    return {
        type: Remove_One_Services_Data_Screen,
        data: data,
    }
}