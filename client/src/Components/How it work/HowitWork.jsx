import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {fa1, fa2, fa3, fa4} from "@fortawesome/free-solid-svg-icons"
import "./HowitWork.css"

function HowitWork() {
  return (
    <div>
        
      <div className="howContainer">
      <div className="heading">
          <h1>How It's Works</h1>

      </div>
      
          
          <div className="howButtons">
              <span>
                    <FontAwesomeIcon icon={fa1} className="faNumber" />
                    <button id="bc1">Search for Restaurants</button>
              </span>
              <span>
                    <FontAwesomeIcon icon={fa2} className="faNumber" />
                    <button id="bc2">Select Menu</button>
              </span>
              <span>
                    <FontAwesomeIcon icon={fa3} className="faNumber" />
                    <button id="bc3">Select Date and Time</button>
              </span>
              <span>
                     <FontAwesomeIcon icon={fa4} className="faNumber"/>
                     <button id="bc4">Enjoy your Meal</button>
              </span>
          </div>
         

      </div>
    </div>
  )
}

export default HowitWork
