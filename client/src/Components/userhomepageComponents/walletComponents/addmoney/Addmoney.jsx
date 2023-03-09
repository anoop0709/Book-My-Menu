import React from 'react'
import { useSelector } from 'react-redux';
import "./Addmoney.css"

function Addmoney() {
  const wallet = useSelector((state)=>{return state.WalletInfo.authData});
  const user = useSelector((state)=>{return state?.UserInfo.authData});
  return (
    <div className='addMoneyContainer'>
      <div className="addmoneyWrapper">
        {
          Object.keys(wallet).length ? (
          <>


          </>
          ):(
            <>
            <p>There is no wallet available to add money please create a wallet</p>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Addmoney
