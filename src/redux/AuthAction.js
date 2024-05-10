import { Fetch_Auth_Token } from "./Constant"

export const SetAuthToken = (data) => {
    return {
        type: Fetch_Auth_Token,
        data: data,
    }
}