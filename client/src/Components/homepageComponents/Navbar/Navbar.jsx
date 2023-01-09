import "./Navbar.css"
import { useNavigate,useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ProfilePop from "../profilepopup/ProfilePop";

function Navbar() {
 const [user,setUser]= useState(JSON.parse(localStorage.getItem('profile')));
const Location = useLocation();
const dispatch = useDispatch();

useEffect(()=>{
  let token;
  if(user){
   token = user.token;
   Navigate('/')
  }
  setUser(JSON.parse(localStorage.getItem('profile')))
},[Location]);

const logout = ()=>{
  dispatch({type:"LOGOUT"});
  Navigate("/");
  setUser(null);

}

const Navigate = useNavigate();
const handleSignIn = ()=>{
  Navigate('/signin')
}
const handleLogin = ()=>{
  Navigate('/login')
}
const homePage = ()=>{
  Navigate('/')
}
  return (
    <div>
      <div className="navContainer">
          <div className="navWrapper">
            <h1 onClick ={homePage}>Book My Menu</h1>
              {/* <img src={logo} className="logo" onClick ={homePage} alt="Book My Menu"/> */}
              
                { user ? (
                  <div className="navItems">
                  <button className="navButtons">{user.user}</button>
                  <button className="navButtons" onClick={logout}>LogOut</button>
                   <ProfilePop/>
                  </div>
                  ) : (
                  <div className="navItems">
                  <button className="navButtons" onClick={handleSignIn}>Register</button>
                  <button className="navButtons" onClick={handleLogin}>Login</button>
                  </div>
                )}
              
          </div>
      </div>
    </div>
  )
}

export default Navbar
