import "./Navbar.css"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePop from "../profilepopup/ProfilePop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { get_user_info } from "../../../actions/UserActions";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userInfo = useSelector((state) => { return state.UserInfo.authData });
  const Location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  let count = 0;
  userInfo?.wishlist.map((_) => {
    return count += 1;
  })
  // useEffect(() => {

  //   if (user?.Token) {
      
  //     Navigate('/')
  //   }
   
  // }, [Location]);
  useEffect(()=>{
    if (user?.Token) {
      
    dispatch(get_user_info(user.userId))
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
    Navigate('/')
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
              <FontAwesomeIcon icon={faBell} />
              </div>
              <FontAwesomeIcon icon={faCartShopping} />
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
