import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { walletTransaction } from "../../../../actions/UserActions";
import "./Addmoney.css";

function Addmoney() {
  const wallet = useSelector((state) => {
    return state.WalletInfo.authData;
  });
  const user = useSelector((state) => {
    return state?.UserInfo.authData;
  });
  const [money, setMoney] = useState(0);
  const [select,setSelect] = useState("")
  const [moneyerr,setMoneyerr] = useState(false);
  const [selecterr,setSelecterr] = useState(false);
  const [message,setMessage] = useState(false)
  const dispatch = useDispatch();

  const wallet_Transactions = async ()=>{
    if(money === 0){
      setMoneyerr(true)
    }else if(select == ""){
      setSelecterr(true)
    }else{
   dispatch(walletTransaction({amount:money,walletid:select,transactionType:"credit"}))
   setMessage(true)
  
   setTimeout(()=>{
    setMessage(false)
    setMoney(0);
    setSelect("")
   },2000);
      }
    }

  console.log(typeof(money),select);
  return (
    <div className="addMoneyContainer">
      <div className="addmoneyWrapper">
        {Object.keys(wallet)?.length ? (
          <div className="addMoney">
            <label htmlFor="">ENTER AMOUNT</label>
           
            <input
              name="money"
              className="money"
              type="number"
              required
              value={money}
              onChange={(e) => {setMoney(parseInt(e.target.value)); setMoneyerr(false)} }
            />
             {moneyerr && (
              <p>Please enter a valid amount</p>
            )}
            <label htmlFor="">SELECT WALLET</label>
            <select name="wallet" id="wallet" className="box" required
            value={select}
            onChange={(e)=>{setSelect(e.target.value); setSelecterr(false)}}
            >
              <option value=""></option>
              <option value={wallet?._id}>{wallet?.accountname}</option>
            </select>
            {selecterr && (
              <p>Please choose a wallet</p>
            )}
            <button onClick={wallet_Transactions}>ADD MONEY</button>
          </div>
        ) : (
          <>
            <p>
              There is no wallet available to add money please create a wallet
            </p>
          </>
        )}
      </div>
      {
        message && (
          <div className="message">
            <p>amount of {money} added to your wallet</p>
            <FontAwesomeIcon className="iconmessage" icon={faCircleCheck} />
          </div>
        )
      }
    </div>
  );
}

export default Addmoney;
