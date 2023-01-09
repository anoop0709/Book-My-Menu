import express from "express";
const router = express.Router();
import {homePage, userSignup,userSignin} from '../Controller/UserHelper.js'
import auth from "../Middleware/authMiddleware.js"



//user
router.get('/',homePage);
router.post('/signup',userSignup);
router.post('/signin',userSignin);



//admin

router.get('/')


export default router;