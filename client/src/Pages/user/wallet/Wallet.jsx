import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Footer from '../../../Components/userhomepageComponents/Footer/Footer'
import Navbar from '../../../Components/userhomepageComponents/Navbar/Navbar'
import Addmoney from '../../../Components/userhomepageComponents/walletComponents/addmoney/Addmoney'
import Mywallet from '../../../Components/userhomepageComponents/walletComponents/mywallet/Mywallet'
import WalletSidebar from '../../../Components/userhomepageComponents/walletComponents/walletSidebar/WalletSidebar'
import Withdrawmoney from '../../../Components/userhomepageComponents/walletComponents/withdrawmoney/Withdrawmoney'
import Transaction from '../../../Components/userhomepageComponents/walletComponents/transaction/Transaction'
import "./Wallet.css"
import { useDispatch, useSelector } from 'react-redux'
import { walletInfo } from '../../../actions/UserActions'


function Wallet() {
    const [pages, setPages] = useState("My Wallet");
    const wallet = useSelector((state)=>{return state.WalletInfo.authData});
    const user = useSelector((state)=>{return state?.UserInfo.authData});
    const dispatch = useDispatch();
    useEffect(()=>{
    if(user){
      dispatch(walletInfo(user?._id))
    }
      
    },[user,pages])
    console.log(wallet,"wallet");
  return (

    <>
    <Navbar/>
    <div className="inpcontainer"></div>
    <div className="profileContainer">
        <div className="Profilewrapper">
          <div className="Sidelist">
            <div className="iconlist">
              <FontAwesomeIcon icon={faWallet} className="Profilepic"/>
            </div>
            <WalletSidebar setPages={setPages} />
          </div>
          <div className="Mainlist">
          {pages === "My Wallet" && <Mywallet/>}
          {pages === "Add Money" && <Addmoney/>}
          {pages === "Withdraw Money" && <Withdrawmoney/>}
          {pages === "Transactions" && <Transaction/> }
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Wallet
