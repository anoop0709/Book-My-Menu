import React, { useState } from 'react'
import "./AdminNavbar.css"

function AdminNavbar() {
    const [admin,setAdmin] = useState(JSON.parse(localStorage.getItem('admin')).Admin);


  return (
   <div className="admincontainer">
       <div className="wrapper">
           <div className="navItems">
               <div className="navbtns">
                      
                           <h5>{admin}</h5>
               </div>
           </div>
       </div>
   </div>
  )
}

export default AdminNavbar
