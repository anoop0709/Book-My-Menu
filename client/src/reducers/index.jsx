import {combineReducers} from "redux";
import {AuthReducer} from "./signup"
import {AdminAuthReducer} from "./AdminLogin"
export default combineReducers({
    AuthReducer,AdminAuthReducer
})
