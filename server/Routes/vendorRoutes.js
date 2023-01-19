import express from "express";
import {vendorRegister,vendorLogin}  from "../Controller/VendorHelper.js";
const router = express.Router();


router.post('/vendorSignup',vendorRegister)
router.post('/vendorLogin',vendorLogin)




export default router;