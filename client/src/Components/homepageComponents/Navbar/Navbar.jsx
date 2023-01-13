import "./Navbar.css"
import { useNavigate,useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import ProfilePop from "../profilepopup/ProfilePop";

function Navbar() {
 const [user,setUser]= useState(JSON.parse(localStorage.getItem('profile')));
const Location = useLocation();
const dispatch = useDispatch();
const Navigate = useNavigate();
useEffect(()=>{
 
  if(user?.Token){
   Navigate('/')
  }
  setUser(JSON.parse(localStorage.getItem('profile')))
},[Location]);

const logout = ()=>{
  dispatch({type:"LOGOUT"});
  Navigate("/");
  setUser(null);

}
const settings = ()=>{
  Navigate('/settings');
}


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
                  <div className="navItem">
                   <ProfilePop user={user} logout ={logout} settings ={settings}/>
                  </div>
                  ) : (
                  <div className="navItem">
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
