import express from "express";
import {vendor_Register,vendor_Login,add_Starter,get_Menu}  from "../Controller/VendorHelper.js";
const router = express.Router();


router.post('/vendor_Signup',vendor_Register)
router.post('/vendor_Login',vendor_Login)

router.get('/get_menu/:email',get_Menu)
router.post('/add_starter/:email',add_Starter)




export default router;