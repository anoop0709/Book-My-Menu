import express from "express";
const router = express.Router();
import {admin_Login,admin_Signup,all_Users,block_User,
    unblock_User,all_Vendors,block_Vendor,unblock_Vendor,
    get_New_Vendors,get_All_Restaurant,verify_Vendor,all_Bookings} from "../Controller/AdminHelper.js"

router.post('/admin_Signup',admin_Signup)
router.post('/admin_Login',admin_Login);

router.get('/all_users',all_Users)
router.patch('/block_user/:id',block_User)
router.patch('/unblock_user/:id',unblock_User)

router.get('/all_vendors',all_Vendors)
router.patch('/block_vendor/:id',block_Vendor)
router.patch('/unblock_vendor/:id',unblock_Vendor)
router.get('/getnew_vendors',get_New_Vendors)
router.get('/all_restaurant',get_All_Restaurant)
router.patch('/verify_vendor/:id',verify_Vendor)
router.get('/all_bookings',all_Bookings)



export default router;