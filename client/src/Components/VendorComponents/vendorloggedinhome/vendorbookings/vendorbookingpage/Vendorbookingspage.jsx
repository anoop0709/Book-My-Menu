import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { allBookings, getAllusers } from '../../../../../actions/AdminActions';
import RestBookingmenu from '../bookingmenu/RestBookingmenu'
import AllBookings from '../bookingsNavbarcomponents/allBookings/AllBookings'
import "./Vendorbookingspage.css"

function Vendorbookingspage() {
  const [bookings,setBookings] =  useState("ALL BOOKINGS");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allBookings());
    dispatch(getAllusers());
  },[]);
  return (
    <div className="resMainconatainer">
      <div className="resMainwrapper" >
        <div className="resMainmenu">
          <RestBookingmenu setBookings = {setBookings}/>
        </div>
          {/* {/* {menu === "MENU" && <Menulist/>} */}
          {bookings === "ALL BOOKINGS" && <AllBookings/>} 
      </div>

     
    </div>
  )
}

export default Vendorbookingspage
