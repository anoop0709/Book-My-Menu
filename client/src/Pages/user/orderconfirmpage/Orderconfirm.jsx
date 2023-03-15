import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Footer from "../../../Components/userhomepageComponents/Footer/Footer";
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar";
import "./Orderconfirm.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import {
  paypalPay,
  walletInfo,
  walletTransaction,
} from "../../../actions/UserActions";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

function Orderconfirm() {
  const wallet = useSelector((state) => {
    return state?.WalletInfo?.authData;
  });
  console.log(wallet);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [orderID, setOrderID] = useState("");
  const Location = useLocation();
  const [showpayment, setShowpayment] = useState(false);
  const slot = useSelector((state) => {
    return state.AvailableSlots.authData;
  });

  const { restaurant, dateobj, time, menuItems, reducerFunction } =
    Location.state;
  const user = JSON.parse(localStorage.getItem("profile"));
  const Total = reducerFunction + (reducerFunction * 4) / 100;
  const restaurantId = restaurant[0]._id;
  useEffect(() => {
    dispatch(walletInfo(user?.userId));
  }, [showpayment]);
  const initialOptions = {
    "client-id":
      "AQUGmBoXbdRKjfok_-vo-LPrg-NSlSM8X-CoeUe1kBI6b5IDXcFTVVPmGT3FmYquXLrakjYcs9uo4Xxs",
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
              value: parseInt(Total),
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
     const paymentMethod = "paypal"
      setSuccess(true);
      dispatch(
        paypalPay(
          dateobj,
          time,
          restaurantId,
          menuItems,
          user,
          Total,
          data,
          paymentMethod,
          Navigate
        )
      );
      localStorage.removeItem("menu");
      localStorage.removeItem("menuname");
    });
  };
  //capture likely error
  // const onError = (data, actions) => {
  //   setErrorMessage("An Error occured with your payment ");
  // };

  const handlePayment = () => {
    if (wallet?.balance > Total) {
      setErrorMessage(false);
      dispatch(
        walletTransaction({
          amount: parseInt(Total),
          walletid: wallet._id,
          transactionType: "debit",
        })
      );
      setTimeout(()=>{
        const data = wallet?.transactions[wallet?.transactions?.length-1];
        const paymentMethod = "Wallet" 
        dispatch(
          paypalPay(
            dateobj,
            time,
            restaurantId,
            menuItems,
            user,
            Total,
            data,
            paymentMethod,
            Navigate
          )
        );
        localStorage.removeItem("menu");
        localStorage.removeItem("menuname");
      },2000)
     
      setTimeout(() => {
        setShowpayment(false);
      }, 2000);
    } else {
      setErrorMessage(true);
    }
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
              <p>TEL : {restaurant[0]?.phonenumber}</p>
            </div>
            <div className="userDetailsBox">
              <p>NAME : {user?.user}</p>
              <p>EMAIL : {user?.Email}</p>
              <p>TEL : {user?.phonenumber}</p>
              <p>BOOKED DATE : {dateobj?.date}</p>
              <p>
                TIME : {time}{" "}
                {parseFloat(time.split(":").join("")) > 1200 ? "PM" : "AM"}
              </p>
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
            {menuItems?.map((item, index) => (
              <div className="itemDetails" key={index}>
                <p>{item.itemsMenu.itemName}</p>
                <p>{item.itemsMenu.itemDescription}</p>
                <p>{item.qty}</p>
                <p>£ {item.itemsMenu.itemPrice} .00</p>
              </div>
            ))}
          </div>
        </div>
        <div className="paymentBox">
          <div className="total">
            <div className="subtotal">
              <h5>Sub Total :</h5> <span> £ {reducerFunction} .00 </span>
            </div>
            <div className="subtotal">
              <h6>VAT :</h6>
              <span> £ {(reducerFunction * 4) / 100}</span>{" "}
            </div>
            <div className="line"></div>
            <div className="subtotal">
              {" "}
              <h5>Total :</h5>
              <span> £ {Total}</span>
            </div>
          </div>
          <div className="paymentBtn">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </PayPalScriptProvider>

            {Object.keys(wallet)?.length && (
              <button
                className="payBtn"
                onClick={() => {
                  setShowpayment(true);
                  console.log(33344422);
                }}
              >
                Pay with Wallet
              </button>
            )}
          </div>
        </div>
        {showpayment && (
          <Modal
            show={showpayment}
            onHide={() => {
              setShowpayment(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Wallet Payment</Modal.Title>
            </Modal.Header>
            <ModalBody>
              <div className="modalInp">
                {errorMessage && (
                  <p
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    Insufficient Balance. please add Money to your wallet !!!!
                  </p>
                )}
                <div className="inp">
                  <label htmlFor=""> Wallet:</label>
                  <input
                    style={{
                      color: "gray",
                      border: "none",
                    }}
                    type="text"
                    name="accountname"
                    value={wallet?.accountname}
                    readOnly
                  />
                </div>
                <div className="inp">
                  <label htmlFor="">Account Number:</label>
                  <input
                    style={{ color: "gray", border: "none" }}
                    type="number"
                    name="cardnumber"
                    value={wallet?.cardnumber}
                    readOnly
                  />
                </div>
                <div className="inp">
                  <h5 style={{ margin: 0 }}>Sub Total :</h5>{" "}
                  <span> £ {reducerFunction} .00 </span>
                </div>
                <div className="inp">
                  <h6 style={{ margin: 0 }}>VAT :</h6>
                  <span> £ {(reducerFunction * 4) / 100}</span>{" "}
                </div>
                <div className="inp">
                  {" "}
                  <h5 style={{ margin: 0 }}>Total :</h5>
                  <span> £ {Total}</span>
                </div>
              </div>
            </ModalBody>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  setShowpayment(false);
                }}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handlePayment}>
                Pay £ {Total}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Orderconfirm;
