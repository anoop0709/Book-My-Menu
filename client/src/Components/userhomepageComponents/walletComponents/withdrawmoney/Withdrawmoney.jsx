import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { walletInfo, walletTransaction } from "../../../../actions/UserActions";

function Withdrawmoney() {
  const wallet = useSelector((state) => {
    return state?.WalletInfo;
  });
  const walletError = useSelector((state) => {
    return state?.WalletInfo.error;
  });
  console.log(wallet, walletError);
  const user = useSelector((state) => {
    return state?.UserInfo.authData;
  });
  const [errormsg,setErrormsg] = useState(false);
  const [money, setMoney] = useState(0);
  const [select, setSelect] = useState("");
  const [moneyerr, setMoneyerr] = useState(false);
  const [selecterr, setSelecterr] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(walletError){
      setErrormsg(true)
    }
    console.log(errormsg);
  },[walletError]);
  const wallet_Transactions = () => {
    if (money === 0) {
      setMoneyerr(true);
    } else if (select == "") {
      setSelecterr(true);
    } else {
      dispatch(
        walletTransaction({
          amount: money,
          walletid: select,
          transactionType: "debit",
        })
      )
      setLoading(true);   
          if (errormsg === false) {
            setMessage(true);
            setTimeout(() => {
              setMessage(false);
              setMoney(0);
              setSelect("");
            }, 2000);
          } 
    }
  };

  console.log(typeof money, select,errormsg);
  return (
    <div className="addMoneyContainer">
      <div className="addmoneyWrapper">
        {Object.keys(wallet?.authData).length ? (
          <div className="addMoney">
           
            <label htmlFor="">ENTER AMOUNT</label>
            <input
              name="money"
              className="money"
              type="number"
              required
              value={money}
              onChange={(e) => {
                setMoney(parseInt(e.target.value));
                setMoneyerr(false);
              }}
              />
            
            {moneyerr && <p>Please enter a valid amount</p>}
            <label htmlFor="">SELECT WALLET</label>
            <select
              name="wallet"
              id="wallet"
              className="box"
              required
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
                setSelecterr(false);
              }}
            >
              <option value=""></option>
              <option value={wallet?.authData?._id}>
                {wallet?.authData?.accountname}
              </option>
            </select>
            {selecterr && <p>Please choose a wallet</p>}
            <button onClick={wallet_Transactions}>WITHDRAW</button>
          </div>
        ) : (
          <>
            <p>
              There is no wallet available to withdraw money please create a
              wallet
            </p>
          </>
        )}
      </div>
      {/* <>
        {loading && (
          <div className="message">
            <p>Loading...</p>
          </div>
        )}
      </> */}
      <>
        {errormsg && (
          <div className="error">
            <p>{wallet?.error}</p>
            <FontAwesomeIcon className="iconmessage" icon={faCircleXmark} />
          </div>
        )}
      </>
      <>
        {message && (
          <div className="message">
            <p>amount of {money} withdrawed succesfully</p>
            <FontAwesomeIcon className="iconmessage" icon={faCircleCheck} />
          </div>
        )}
      </>
    </div>
  );
}

export default Withdrawmoney;
