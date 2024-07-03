import { Address } from "./Constant"

export const SetAddress = (data) => {
    return {
        type: Address,
        data: data,
    }
}