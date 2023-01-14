import { faCheckCircle, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "./VendorHowitWork.css";

function VendorHowitWork() {
  return (
    <div className="HowItContainer">
        <div className="HowItwrapper">
            <div className="HowIt">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <h2>step 1</h2>
                <h3>Register your Account</h3>
                <p>Please Register your Details to Start Online Journey</p>

            </div>
            <div className="HowIt">
                <FontAwesomeIcon icon={faUtensils} className="icon"/>
                <h2>step 2</h2>
                <h3>Set up your Restaurant</h3>
                <p>Add your Menu and Prices and Change Images</p>

            </div>
            <div className="HowIt">
                <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                <h2>step 3</h2>
                <h3>Accept Bookings</h3>
                <p>Accept Bookings Online from Your Customers</p>

            </div>
        </div>
      
    </div>
  )
}

export default VendorHowitWork
