import express from "express";
const router = express.Router();
import {
  homePage,
  user_Signup,
  user_Signin,
  get_user_info,
  add_to_Wishlist,
  dele_from_Wishlist,
  check_Email,
  get_Menu,
  get_available_slot,
  date_Booking,
  add_new_address,
  update_User,
  dele_Address,
  update_Password,
  all_User_Bookings
} from "../Controller/UserHelper.js";
import auth from "../Middleware/authMiddleware.js";

//user
router.get("/", homePage);
router.post("/signup", user_Signup);
router.post("/signin", user_Signin);
router.get("/user_info/:id", get_user_info);
router.post("/add_to_wishlist/:id/:restid", add_to_Wishlist);
router.post("/dele_from_wishlist/:id/:restid", dele_from_Wishlist);
router.post("/check_email", check_Email);
router.post("/get_menu/:vendorId", get_Menu);
router.post("/get_slots/:RestId", get_available_slot);
router.post("/book_slot", date_Booking);
router.post("/add_address",add_new_address);
router.post("/dele_address",dele_Address)
router.post("/update_user",update_User)
router.post('/update_password',update_Password)
router.get("/all_user_bookings/:id",all_User_Bookings)

export default router;
