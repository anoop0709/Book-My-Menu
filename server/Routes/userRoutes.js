import express from "express";
const router = express.Router();
import {homePage, user_Signup,user_Signin, verify_Otp} from '../Controller/UserHelper.js'
import auth from "../Middleware/authMiddleware.js"



//user
router.get('/',homePage);
router.post('/signup',user_Signup);
router.post('/signin',user_Signin);
router.post('/otp_verify',verify_Otp)



//admin

router.get('/')


export default router;