import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import "./Vendorloggedinnavbar.css"

function Vendorloggedinnavbar(setPages) {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
 
  const logout = ()=>{
    dispatch({type:"VENDORLOGOUT"})
    Navigate('/vendor')
  }
  const [active, setActive] = useState(0)
  const navMenu = ['MY RESTAURANT', 'BOOKINGS', 'SALES REPORT', 'ACCOUNT']
  return (
    <div className="vendornavbarContainer">
      <div className="vendornavbarWrapper">
        <div className="vendorLogo">
          <h1>Book My Menu</h1>
          <h5>Vendor</h5>
        </div>
        <div className="vendornavbaritems">
          <div className="navListItems">
            {navMenu.map((item, index) => (
              <div className={active === index ? "Item Active" : "Item"} key={index} onClick={() => setActive(index)}>
                <div onClick={()=>setPages(item)}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="vendorName">
          <p>vendor name</p>
          <button onClick={logout}>Log out</button>
        </div>
      </div>


    </div>
  )
}

export default Vendorloggedinnavbar
