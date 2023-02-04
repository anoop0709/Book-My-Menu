import express from "express";
const router = express.Router();
import {homePage, user_Signup,user_Signin,get_user_info,add_to_Wishlist,dele_from_Wishlist,check_Email} from '../Controller/UserHelper.js'
import auth from "../Middleware/authMiddleware.js"



//user
router.get('/',homePage);
router.post('/signup',user_Signup);
router.post('/signin',user_Signin);
router.get('/user_info/:id',get_user_info);
router.post('/add_to_wishlist/:id/:restid',add_to_Wishlist)
router.post('/dele_from_wishlist/:id/:restid',dele_from_Wishlist)
router.post ('/check_email',check_Email)




//admin

router.get('/')


export default router;