import React from 'react'
import { useSelector } from 'react-redux'

function BookingsPage() {
    const user_booking = useSelector((state)=>{return state.UserBooking.authData});
    console.log(user_booking);
  return (
    <div>
  
    </div>
  )
}

export default BookingsPage
