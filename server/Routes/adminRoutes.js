import express from "express";
const router = express.Router();
import {adminLogin,adminSignup,allUsers,blockUser,
    UnblockUser,allVendors,blockVendor,UnblockVendor,
    getNewVendors,getAllRestaurant,VerifyPayment} from "../Controller/AdminHelper.js"

router.post('/adminSignup',adminSignup)
router.post('/adminLogin',adminLogin);

router.get('/allusers',allUsers)
router.patch('/blockuser/:id',blockUser)
router.patch('/unblockuser/:id',UnblockUser)

router.get('/allvendors',allVendors)
router.patch('/blockvendor/:id',blockVendor)
router.patch('/unblockvendor/:id',UnblockVendor)
router.get('/getnewvendors',getNewVendors)
router.get('/allrestaurant',getAllRestaurant)
router.patch('/verifyvendor/:id',VerifyPayment)



export default router;