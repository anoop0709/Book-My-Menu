import express from "express";
const router = express.Router();
import {adminLogin} from "../Controller/AdminHelper.js"


router.post('/',adminLogin);


export default router;