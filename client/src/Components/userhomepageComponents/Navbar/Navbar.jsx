import "./Navbar.css"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePop from "../profilepopup/ProfilePop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faCartShopping, faWallet } from "@fortawesome/free-solid-svg-icons";
import { get_user_info } from "../../../actions/UserActions";
import { userInfo } from "../../../Api/Userapi";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userInfo = useSelector((state) => { return state.UserInfo.authData });
  const Location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  let count = 0;
  userInfo?.wishList?.map((_) => {
    return count += 1;
  })
  let menuCount = 0;
  const menu = JSON.parse(localStorage.getItem("menu"));
  if(menu?.length){
    menuCount = menuCount+1;
  }

  
  useEffect(()=>{
    if (user?.Token) {
      
    dispatch(get_user_info(user?.userId,Navigate))
    }
  },[user])

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
    setUser(null);

  }
  const settings = () => {
    Navigate('/settings');
  }


  const handleSignIn = () => {
    Navigate('/signin')
  }
  const handleLogin = () => {
    Navigate('/login')
  }
  const homePage = () => {
    Navigate("/")
  }
  const wishlist = ()=>{
    Navigate('/wishlist')
  }
  const wallet = ()=>{
    Navigate('/wallet')
  }
 
  return (
    <div>
      <div className="navContainer">
        <div className="navWrapper">
          <h1 onClick={homePage}>Book My Menu</h1>
          {user ? (
            <div className="Navitems">
              <div className="wishCount">
              <div className="wish">{count}</div>
              <FontAwesomeIcon className="navicon" icon={faBell} onClick={wishlist}/>
              </div>
              <FontAwesomeIcon className="navicon" icon={faWallet} onClick={wallet}/>
              <ProfilePop user={user} logout={logout} settings={settings} />
            </div>
          ) : (
            <div className="Navitems">
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
