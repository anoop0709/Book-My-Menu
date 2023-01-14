import React, { useEffect } from 'react'
import './Vendornavbar.css'

function Vendornavbar() {
const vendor = JSON.parse(localStorage.getItem('vendor'));

useEffect(()=>{

},[vendor])

  return (
   <div className="vendorNavContainer">
       <div className="vendorNavWrapper">
           <div className="vendorNavItems">
               <div className="logo">
                   <h1>Book My Menu</h1>
                   <span>For Business</span>
               </div>
               {vendor ? (
                    <div className="vendorNavBtns">
                    <button>{vendor}</button>
                    <button>Log In</button>
                </div>
               ):(
               <div className="vendorNavBtns">
                   <button>Register</button>
                   <button>Log In</button>
               </div>
               )}
           </div>
       </div>
   </div>
  )
}

export default Vendornavbar
