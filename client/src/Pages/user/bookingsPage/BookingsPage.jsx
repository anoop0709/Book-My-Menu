import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BookingsPage.css";
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../Components/userhomepageComponents/Footer/Footer";

function BookingsPage() {
  const user_booking = useSelector((state) => {
    return state.UserBooking.authData;
  });
  const slot = useSelector((state) => {
    return state.AvailableSlots.authData;
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const restaurants = useSelector((state) => {
    return state.AllRestaurants.authData;
  });
  const user = useSelector((state) => {
    return state.UserInfo.authData;
  });
  const restId = user_booking?.Order.restaurantId;
  console.log(user_booking?.Order.restaurantId);
  console.log(restId);
  const rest = restaurants.filter((res) => {
    if (res._id == restId) {
      return res;
    }
  });

  const homePage = ()=>{
    Navigate('/')
  }
  console.log(user_booking, rest, user);
  return (
    <>
      <Navbar />
      <div className="bookingsContainer">
        <div className="confirm">
          <h1>Your Booking Confirmed </h1>
          <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} />
        </div>
        <div className="confirm">
          <h1>Thank you for using our service and have a nice Dinning.. </h1>
          <FontAwesomeIcon className="iconCheck" icon={faFaceSmile} />
        </div>
        <div className="bookingsWrapper">
          <div className="bookingRow">
            <div className="Details">
              <div className="headingBox">
                <h5>BOOKING DETAILS</h5>
              </div>
              <div className="dataDiv">
                <p>
                  <span>BOOKED DATE : </span>
                  {user_booking?.Order.bookedDate.date}
                </p>
                <p>
                  <span>NUMBER OF PEOPLE : </span>
                  {user_booking?.Order.bookedDate.number}
                </p>
                <p>
                  <span> TIME BOOKED : </span>
                  {user_booking?.Order.timeSlot}
                </p>
                <p>
                  <span>ORDER ID : </span>
                  {user_booking?.Order.TransactionDetails.orderID}
                </p>
                <p>
                  <span>PAYMENT METHOD : </span>
                  {user_booking?.Order.paymentMethod}
                </p>
              </div>
            </div>
            <div className="Details">
              <div className="headingBox">
                <h5>USER DETAILS</h5>
              </div>
              <div className="dataDiv">
                <p>
                  <span>FIRST NAME : </span>
                  {user?.firstname}
                </p>
                <p>
                  <span>LAST NAME : </span>
                  {user?.lastname}
                </p>
                <p>
                  <span>EMAIL : </span>
                  {user?.email}
                </p>
                <p>
                  <span>PHONE NUMBER : </span>
                  {user?.phonenumber}
                </p>
              </div>
            </div>
            <div className="Details">
              <div className="headingBox">
                <h5>RESTAURANT DETAILS</h5>
              </div>
              <div className="dataDiv">
                <p>
                  <span>RESTAURANT NAME : </span>
                  {rest[0]?.restaurantname}
                </p>
                <p>
                  <span>ADDRESS : </span>
                  {rest[0]?.address}
                </p>
                <p>
                  <span>LOCATION : </span>
                  {rest[0]?.location}
                </p>
                <p>
                  <span>PHONE NUMBER : </span>
                  {slot?.vendorPhonenumber}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="itemDetails">
          <div className="itemheadingBox">
            <h5>ITEM DETAILS</h5>
          </div>
          <div className="itemdataDiv">
            <div className="itemList">
              <p>NAME</p>
              <p>DESCRIPTION</p>
              <p>QTY</p>
              <p>PRICE</p>
           
            </div>
            <hr />
            {user_booking?.Order.menuItems.map((item, index) => (
              <div key={index} className="itemList">
                <p>{item.itemsMenu.itemName}</p>
                <p>{item.itemsMenu.itemDescription}</p>
                <p>{item.qty}</p>
                <p>£ {item.itemsMenu.itemPrice}.00</p>          
              </div>      
            ))}
            <div className="totald">
            <p>
              <span>TOTAL : </span>£ {user_booking?.Order.totalAmount}
            </p>
            </div>
          </div>
        </div>

        <button className="btnHome" onClick={homePage}>Back to Home</button>
      </div>
      <Footer/>
    </>
  );
}

export default BookingsPage;
