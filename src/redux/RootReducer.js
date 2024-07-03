import { combineReducers } from "redux"
import { FSReducer } from './FSReducer'
import { ThemeReducer } from './ThemeReducer'
import { AuthReducer } from './AuthReducer'
import { UserReducer } from './UserReducer'
import { PromocodeReducer } from './PromocodeReducer'
import { VersionReducer } from './VersionReducer'
import { ActiveScreenReducer } from './ActiveScreen/ActiveScreenReducer'
import { ServicesDataReducer } from "./ServicesData/ServicesDataReducer"
import { AddressReducer } from "./AddressReducer"

export default rootReducer = combineReducers({
    AuthReducer,
    FSReducer,
    ThemeReducer,
    UserReducer,
    VersionReducer,
    PromocodeReducer,
    ActiveScreenReducer,
    ServicesDataReducer,
    AddressReducer
})
