import "./Navbar.css"
import logo from "../../images/Book My Menu (3).png"

function Navbar() {
  return (
    <div>
      <div className="navContainer">
          <div className="navWrapper">
              <img src={logo} className="logo" alt="Book My Menu"/>
              <div className="navItems">
                  <button className="navButtons">Register</button>
                  <button className="navButtons">Login</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
