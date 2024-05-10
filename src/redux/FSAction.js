import { Fetch_Font_Size } from "./Constant"

export const SetFontSize = (data) => {
    return {
        type: Fetch_Font_Size,
        data: data,
    }
}