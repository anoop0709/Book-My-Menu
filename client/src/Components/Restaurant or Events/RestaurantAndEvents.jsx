import './RestaurantAndEvents.css'
import Restuarant from "../../images/bastille.jpg";
import Events from "../../images/events.jpeg"

function RestaurantAndEvents() {
  return (
    <div>
        
      <div className="restContainer">
          <div className="heading">

      <h1>Explore</h1>
          </div>
          <div className="restWrapper">
              <div className="restaurantsandevents">
                  <img src={Restuarant} alt=""/>
                  <span> Restaurants</span>
              </div>
             
              <div className="restaurantsandevents">
              <img src={Events} alt=""/>
                  <span> Events</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default RestaurantAndEvents
