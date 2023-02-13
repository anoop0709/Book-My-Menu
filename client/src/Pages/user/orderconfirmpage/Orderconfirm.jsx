import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import Footer from '../../../Components/userhomepageComponents/Footer/Footer';
import Navbar from '../../../Components/userhomepageComponents/Navbar/Navbar';
import "./Orderconfirm.css";
import {paypalPay} from "../../../actions/UserActions"
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js"

function Orderconfirm() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState("");
  const Location = useLocation();
  const slot = useSelector((state) => { return state.AvailableSlots.authData });
  console.log(slot);
  const { restaurant, dateobj, time, menuItems, reducerFunction } = Location.state;
  const user = JSON.parse(localStorage.getItem("profile"))
  const Total = reducerFunction + (reducerFunction * 4 / 100)
  console.log(restaurant, dateobj, time, menuItems, reducerFunction);
  console.log(time.split(":").join(""));
  const restaurantId = restaurant[0]._id;

  const initialOptions = {
    "client-id": 'AQUGmBoXbdRKjfok_-vo-LPrg-NSlSM8X-CoeUe1kBI6b5IDXcFTVVPmGT3FmYquXLrakjYcs9uo4Xxs',
    currency: "USD",
    intent: "capture",
  };
  const createOrder = (data, actions) => {
    console.log(2134213412341);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value:parseInt(Total),
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        console.log(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      console.log(payer);
      console.log(orderID);
      setSuccess(true);
      dispatch(paypalPay(dateobj,time,restaurantId,orderID,menuItems,user,Total,payer,data,Navigate))

    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  return (
    <>
      <Navbar />
      <div className="paymentconfirmContainer">
        <div className="paymentconfirmWrapper">
          <div className="restAndUser">
            <div className="restDetailsBox">
              <p>RESTAURANT NAME : {restaurant[0]?.restaurantname}</p>
              <p>ADDRESS : {restaurant[0]?.address}</p>
              <p>LOCATION : {restaurant[0]?.location}</p>
              <p>TEL : {slot?.vendorPhonenumber}</p>
            </div>
            <div className="userDetailsBox">
              <p>NAME : {user?.user}</p>
              <p>EMAIL : {user?.Email}</p>
              <p>TEL : {user?.phonenumber}</p>
              <p>BOOKED DATE : {dateobj?.date}</p>
              <p>TIME : {time} {parseFloat(time.split(":").join("")) > 1200 ? "PM" : "AM"}</p>
              <p>NUMBER OF PEOPLE : {dateobj?.number}</p>
            </div>
          </div>
          <div className="itemListBox">
            <div className="listMenu">
              <p>Dish</p>
              <p>Description</p>
              <p>Qty</p>
              <p>Price</p>
            </div>
            {
              menuItems?.map((item, index) => (
                <div className="itemDetails" key={index}>
                  <p>{item.itemsMenu.itemName}</p>
                  <p>{item.itemsMenu.itemDescription}</p>
                  <p>{item.qty}</p>
                  <p>£ {item.itemsMenu.itemPrice} .00</p>
                </div>

              ))
            }
          </div>
        </div>
        <div className="paymentBox">
          <div className="total">
            <div className="subtotal"><h5>Sub Total :</h5> <span> £ {reducerFunction} .00 </span></div>
            <div className="subtotal"><h6>VAT :</h6><span> £ {reducerFunction * 4 / 100}</span>  </div>
            <div className="line"></div>
            <div className="subtotal"> <h5>Total :</h5><span> £ {Total}</span></div>
          </div>
          <div className="paymentBtn">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={(data,actions)=>createOrder(data,actions)}
                onApprove={(data,actions)=>onApprove(data,actions)}

              />
            </PayPalScriptProvider>
            {/* <button className="payBtn" onClick={payment}>Pay {Total}</button> */}
          </div>

        </div>

      </div>

    </>
  )
}

export default Orderconfirm
