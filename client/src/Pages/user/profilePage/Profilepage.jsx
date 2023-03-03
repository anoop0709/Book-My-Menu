import {
  faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_user_info } from "../../../actions/UserActions";
import Footer from "../../../Components/userhomepageComponents/Footer/Footer";
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar";
import Bookings from "./bookings/Bookings";
import Changepassword from "./changepassword/Changepassword";
import Profile from "./profile/Profile";
import "./Profilepage.css";
import ProfileSidebar from "./profilesidebar/ProfileSidebar";
import Wishlist from "./wishlist/Wishlist";

function Profilepage() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [pages, setPages] = useState("Profile");
 const user = useSelector((state)=>{return state.UserInfo.authData});
console.log(user);
useEffect(()=>{
dispatch(get_user_info(user._id,Navigate))
},[user])

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="Profilewrapper">
          <div className="Sidelist">
            <div className="iconlist">
              <FontAwesomeIcon icon={faCircleUser} className="Profilepic" />
            </div>
            <ProfileSidebar setPages={setPages} />
          </div>
          <div className="Mainlist">
            {pages === "Profile" && <Profile user={user}/>}
            {pages === "Change Password" && <Changepassword user={user}/>}
            {pages === "Bookings" && <Bookings userId={user}/>}
            {pages === "Wishlist" && <Wishlist/>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profilepage;
