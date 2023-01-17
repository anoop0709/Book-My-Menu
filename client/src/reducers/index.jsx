import {combineReducers} from "redux";
import {AuthReducer} from "./signup"
import {AdminAuthReducer} from "./AdminLogin"
import {VendorAuthReducer} from "./VendorLogin"
export default combineReducers({
    AuthReducer,AdminAuthReducer,VendorAuthReducer
})
