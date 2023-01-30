import { faCalendarDay, faGlobe, faHotel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./WhyUs.css"

function WhyUs() {
  return (
    <div className="WhyusContainer">
        <div className="WhyText">

        <h3>Why Should you Partner with Book My Menu ?</h3>
        <p>Book My Menu enables you to get 60% more revenue, 10x new customers and boost your brand 
            visibility by providing insights to improve your business.</p>
        </div>
        <div className="WhyusWrapper">
            <div className="WhyCard">
                <FontAwesomeIcon icon={faGlobe} className="WhyIcon"/>
                <div className="text">
                <h3>1000+ Cities</h3>
                <p>Around the Globe</p>
                </div>
            </div>
            <div className="WhyCard">
                <FontAwesomeIcon icon={faHotel} className="WhyIcon"/>
                <div className="text">
                <h3>3+ Lakh </h3>
                <p>Restaurants Listing</p>
                </div>
            </div>
            <div className="WhyCard">
                <FontAwesomeIcon icon={faCalendarDay} className="WhyIcon"/>
                <div className="text">
                <h3>5+ Lakh</h3>
                <p>Bookings per Month </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default WhyUs
