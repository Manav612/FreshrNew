import { Fetch_Auth_Token,Remove_Auth_Token } from "./Constant"

export const SetAuthToken = (data) => {
    return {
        type: Fetch_Auth_Token,
        data: data,
    }
}

export const RemoveAuthToken = () => {
    return {
        type: Remove_Auth_Token,
        data: '',
    }
}