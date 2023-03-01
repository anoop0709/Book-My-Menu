import {
  faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../../Components/userhomepageComponents/Footer/Footer";
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar";
import Bookings from "./bookings/Bookings";
import Changepassword from "./changepassword/Changepassword";
import Profile from "./profile/Profile";
import "./Profilepage.css";
import ProfileSidebar from "./profilesidebar/ProfileSidebar";
import Wishlist from "./wishlist/Wishlist";

function Profilepage() {
  const [pages, setPages] = useState("Profile");
 const user = useSelector((state)=>{return state?.UserInfo.authData});
console.log(user);
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
            {pages === "Bookings" && <Bookings userId={user._id}/>}
            {pages === "Wishlist" && <Wishlist/>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profilepage;
