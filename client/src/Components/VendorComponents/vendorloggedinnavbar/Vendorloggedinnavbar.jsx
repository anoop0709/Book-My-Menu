import React from 'react'
import "./Vendorloggedinnavbar.css"

function Vendorloggedinnavbar() {
  return (
    <div className="vendornavbarContainer">
      <div className="vendornavbarWrapper">
        <div className="vendorLogo">
          <h1>Book My Menu</h1>
          <h5>Vendor</h5>
        </div>
        <div className="vendornavbaritems">
          <ul className="navListItems">
            <li className="Item">
              MY RESTAURANT
            </li>
            <li className="Item">
             BOOKINGS
            </li>
            <li className="Item">
             SALES REPORT
            </li>
            <li className="Item">
             ACCOUNT
            </li>
          </ul>
        </div>
        <div className="vendorName">
          <p>vendor name</p>
          <button>logout</button>
        </div>
      </div>
        
     
    </div>
  )
}

export default Vendorloggedinnavbar
