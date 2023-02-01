import express from "express";
import {vendor_Register,vendor_Login,add_Dish,get_Menu,
    edit_Dish, dele_Dish,get_single_restaurant,dele_Rest_Image,add_Image}  from "../Controller/VendorHelper.js";
import auth from "../Middleware/authMiddleware.js"; 
const router = express.Router();


router.post('/vendor_Signup',vendor_Register)
router.post('/vendor_Login',vendor_Login)
router.get('/get_single_Resturant/:email',get_single_restaurant);
router.get('/dele_rest_image/:email/:index',dele_Rest_Image);
router.post('/add_image/:email',add_Image)

router.get('/get_menu/:email',auth,get_Menu)
router.post('/add_dish/:email',auth,add_Dish)
router.post('/edit_dish',auth,edit_Dish)
router.post('/dele_dish',auth,dele_Dish)


export default router;