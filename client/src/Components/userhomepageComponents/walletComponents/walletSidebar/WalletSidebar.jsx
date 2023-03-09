import { faCreditCard, faMoneyBill, faMoneyBillTransfer, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import "./WalletSidebar.css"

function WalletSidebar({setPages}) {
    const walletItems = ["My Wallet", "Add Money", "Withdraw Money","Transactions"];
    const icons = [faCreditCard,faMoneyBill,faMoneyBillTransfer,faReceipt]
    const [active,setActive] = useState(0);
  return (
    <div className="sidelistItem">
    {
        walletItems.map((item,index)=>(
            <div className={active === index ? "Item Active" : "Item"} key={index} onClick={() => setActive(index)}>
            <div onClick={()=>setPages(item)}>
             <FontAwesomeIcon className='iconsidebar' icon={icons[index]}/> {item}
            </div>
          </div>
        ))
      }

    </div>
     
  )
}

export default WalletSidebar
