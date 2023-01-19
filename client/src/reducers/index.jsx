import {combineReducers} from "redux";
import {AuthReducer} from "./signup"
import {AdminAuthReducer} from "./AdminLogin"
import {VendorAuthReducer} from "./VendorLogin"
import {AllUsers} from "./AllUsers"
import {AllVendors} from "./AllVendors"
export default combineReducers({
    AuthReducer,AdminAuthReducer,VendorAuthReducer,AllUsers,AllVendors
})
