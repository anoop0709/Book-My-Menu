import express from "express";
import {vendor_Register,vendor_Login,add_Starter,get_Menu,
    edit_Starter,dele_Starter,add_Sidedish,edit_Sidedish,dele_Sidedish}  from "../Controller/VendorHelper.js";
const router = express.Router();


router.post('/vendor_Signup',vendor_Register)
router.post('/vendor_Login',vendor_Login)

router.get('/get_menu/:email',get_Menu)
router.post('/add_starter/:email',add_Starter)
router.post('/edit_starter',edit_Starter)
router.post('/dele_starter',dele_Starter)

router.post('/add_sidedish/:email',add_Sidedish)
router.post('/edit_sidedish',edit_Sidedish)
router.post('/dele_sidedish',dele_Sidedish)

export default router;