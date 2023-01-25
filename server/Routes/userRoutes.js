import express from "express";
const router = express.Router();
import {homePage, user_Signup,user_Signin} from '../Controller/UserHelper.js'
import auth from "../Middleware/authMiddleware.js"



//user
router.get('/',homePage);
router.post('/signup',user_Signup);
router.post('/signin',user_Signin);



//admin

router.get('/')


export default router;