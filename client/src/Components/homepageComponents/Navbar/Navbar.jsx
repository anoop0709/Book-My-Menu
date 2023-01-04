import "./Navbar.css"
import logo from "../../../images/Book My Menu (3).jpeg"
import { useNavigate } from "react-router"

function Navbar() {
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
              <img src={logo} className="logo" onClick ={homePage} alt="Book My Menu"/>
              <div className="navItems">
                  <button className="navButtons" onClick={handleSignIn}>Register</button>
                  <button className="navButtons" onClick={handleLogin}>Login</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
