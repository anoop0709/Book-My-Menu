import express from "express";
import {vendor_Register,vendor_Login}  from "../Controller/VendorHelper.js";
const router = express.Router();


router.post('/vendor_Signup',vendor_Register)
router.post('/vendor_Login',vendor_Login)




export default router;