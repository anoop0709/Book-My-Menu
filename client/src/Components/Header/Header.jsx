import "./Header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLocationDot, faSearch} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div>
      <div className="headerContainer">
          <div className="headerWrapper">
              <div className="inpContainer">
                  <FontAwesomeIcon icon={faLocationDot} className="faicon location"/>
                  <input type="text" placeholder="Trivandrum" className="inpbox"/>
                  <FontAwesomeIcon icon={faSearch} className="faicon "/>
              </div>
              <div className="headerHeadings">
              <h1>Book The Menu You Like</h1>
              <p>Discover top-of-the-art restaurants we picked for you</p>
              </div>
              <button>Explore our Restaurants</button>
          </div>
      </div>
    </div>
  )
}

export default Header
