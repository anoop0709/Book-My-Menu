import express from "express";
const router = express.Router();
import {adminLogin,adminSignup} from "../Controller/AdminHelper.js"

router.post('/adminSignup',adminSignup)
router.post('/adminLogin',adminLogin);


export default router;