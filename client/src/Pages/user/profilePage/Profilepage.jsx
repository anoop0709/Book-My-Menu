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

function Profilepage(props) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [pages, setPages] = useState("Profile");
  useEffect(()=>{
    if(props.pages){
      setPages(props.pages)
    }

  },[props])
  return (
    <>
      <Navbar />
      <div className="inpcontainer"></div>
      <div className="profileContainer">
        <div className="Profilewrapper">
          <div className="Sidelist">
            <div className="iconlist">
              <FontAwesomeIcon icon={faCircleUser} className="Profilepic" />
            </div>
            <ProfileSidebar urlpage={props.pages} setPages={setPages} />
          </div>
          <div className="Mainlist">
            {pages === "Profile" && <Profile/>}
            {pages === "Change Password" && <Changepassword/>}
            {pages === "Bookings" && <Bookings/>}
            {pages === "Wishlist" && <Wishlist/>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profilepage;
