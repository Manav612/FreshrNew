import { Fetch_Force_Update } from "./Constant"

export const SetForceUpdate = (data) => {
    return {
        type: Fetch_Force_Update,
        data: data,
    }
}