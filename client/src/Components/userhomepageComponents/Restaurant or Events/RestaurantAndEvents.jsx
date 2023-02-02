import './RestaurantAndEvents.css'
import Restuarant from "../../../images/bastille.jpg";
import Events from "../../../images/events.jpeg"
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allrestaurant } from '../../../actions/AdminActions';

function RestaurantAndEvents() {
 
  const Navigate = useNavigate()
  const dispatch = useDispatch();

  const getAllRestaurant = ()=>{
    console.log("hai");
    dispatch(allrestaurant())
    Navigate("/restaurants") 
    console.log("hello");

  }
 
  return (
    <div>
        
      <div className="restContainer">
          <div className="heading">

      <h1>Explore</h1>
          </div>
          <div className="restWrapper">
              <div className="restaurantsandevents" onClick={getAllRestaurant}>
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
