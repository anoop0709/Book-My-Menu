import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Transaction.css";

function Transaction() {
  const wallet = useSelector((state) => {
    return state?.WalletInfo.authData;
  });
  const [visible, setVisible] = useState(5);

  const loadMore = () => {
    setVisible(visible + 5);
  };

  return (
    <div className="BookingsHistoryContainer">
      <div className="BookinghistoryWrapper">
        <div className="headingList">
          <li className="headingItems">Transaction Id</li>
          <li className="headingItems">Wallet Name</li>
          <li className="headingItems">Amount</li>
          <li className="headingItems">Transaction Type</li>
        </div>
        <div className="bookingList">
          {Object.keys(wallet).length ? (
            <>
              {wallet?.transactions?.slice(0, visible).map((details, index) => (
                <div className="bookingsRow" key={index}>
                  <li className="bookingrowItem">{details._id}</li>
                  <li className="bookingrowItem">{wallet?.accountname}</li>
                  <li className="bookingrowItem">{details.amount}</li>
                  <li
                    className={
                      details.transactionType == "credit"
                        ? "bookingrowItemgreen"
                        : "bookingrowItem"
                    }
                  >
                    {details.transactionType}
                  </li>
                </div>
              ))}
            </>
          ) : (
            <div>
              <p>No Documents to show .....</p>
            </div>
          )}

          {visible < wallet?.transactions?.length && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button className="btnMore" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
