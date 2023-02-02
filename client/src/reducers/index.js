import {combineReducers} from "redux";
import {AuthReducer} from "./signup"
import {AdminAuthReducer} from "./AdminLogin"
import {VendorAuthReducer} from "./VendorLogin"
import {AllUsers} from "./AllUsers"
import {AllVendors} from "./AllVendors"
import { NewVendors} from "./NewVendors"
import {AllRestaurants} from "./AllRestaurants"
import {Restmenu} from "./restaurantMenu"
import {SingleRestaurant} from "./SingleRestaurant"
import {UserInfo} from "./UserInfo";
export default combineReducers({
    AuthReducer,AdminAuthReducer,VendorAuthReducer,
    AllUsers,AllVendors, NewVendors,AllRestaurants,
    Restmenu,SingleRestaurant,UserInfo
})
