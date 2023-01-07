import express from "express";
const router = express.Router();
import {homePage, signup} from '../Controller/UserHelper.js'
import auth from "../Middleware/authMiddleware.js"




router.get('/',homePage);
router.post('/signup',signup);




export default router;