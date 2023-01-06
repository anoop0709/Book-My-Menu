import express from "express";
const router = express.Router();
import {homePage} from '../Controller/UserHelper.js'

router.get('/',homePage)




export default router;