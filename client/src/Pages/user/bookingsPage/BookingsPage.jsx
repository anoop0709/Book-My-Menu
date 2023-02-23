import React from 'react'
import { useSelector } from 'react-redux';
import "./BookingsPage.css"
import Navbar from '../../../Components/userhomepageComponents/Navbar/Navbar';

function BookingsPage() {
    const user_booking = useSelector((state) => { return state.UserBooking.authData });
    const user = JSON.parse(localStorage.getItem("profile"));
    const restaurants = useSelector((state) => { return state.AllRestaurants.authData });
    const restId = user_booking?.restaurantId;
    const rest = restaurants.filter((res) => {
        if (res._id === restId) {
            return res;
        }
    })

    console.log(user_booking);
    return (
        <>
            <Navbar />
            <div className="bookingsContainer">
                <div className="bookingsWrapper">
                    
                    <div className="bookingRow">
                        <div className="Details">
                            <div className="headingBox">
                                <h3>BOOKING DETAILS</h3>
                            </div>
                            <div className="dataDiv">
                                <p><span>BOOKED DATE : </span>{user_booking?.bookedDate.date}</p>
                                <p><span>NUMBER OF PEOPLE : </span>{user_booking?.bookedDate.number}</p>
                            </div>
                        </div>
                        <div className="Details">
                            <div className="headingBox">
                                <h3>USER DETAILS</h3>
                            </div>
                            <div className="dataDiv">
                                <p><span>USER NAME : </span>{user?.user}</p>
                                <p><span>EMAIL : </span>{user?.Email}</p>


                            </div>
                        </div>
                        <div className="Details">
                            <div className="headingBox">
                                <h3>RESTAURANT DETAILS</h3>
                            </div>
                            <div className="dataDiv">
                                <p><span>RESTAURANT NAME : </span>{rest.restaurantname}</p>
                                <p><span>ADDRESS : </span>{rest.address}</p>
                                <p><span>LOCATION : </span>{rest.location}</p>

                            </div>

                        </div>
                        <div className="Details">
                            <div className="headingBox">
                                <h3>Order Details</h3>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default BookingsPage
