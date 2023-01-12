import React from 'react'
import "./AdminNavbar.css"

function AdminNavbar() {

  return (
   <div className="container">
       <div className="wrapper">
           <div className="navItems">
               <div className="navbtns">
                      
                           <h3>AdminName</h3>
                           <button className="navButtons">Create Admin</button>
                           <button className="navButtons">Logout</button>
                       
               </div>
           </div>
       </div>
   </div>
  )
}

export default AdminNavbar
