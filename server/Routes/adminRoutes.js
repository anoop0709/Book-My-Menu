import express from "express";
const router = express.Router();
import {adminLogin,adminSignup,allUsers,blockUser,UnblockUser} from "../Controller/AdminHelper.js"

router.post('/adminSignup',adminSignup)
router.post('/adminLogin',adminLogin);
router.get('/allusers',allUsers)
router.patch('/blockuser/:id',blockUser)
router.patch('/unblockuser/:id',UnblockUser)

export default router;