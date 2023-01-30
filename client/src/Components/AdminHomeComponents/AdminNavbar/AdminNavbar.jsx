import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import "./AdminNavbar.css"

function AdminNavbar() {
    const [admin,setAdmin] = useState(JSON.parse(localStorage.getItem('admin'))?.Email);


  return (
   <div className="admincontainer">
       <div className="wrapper">
           <div className="navItems">
               <div className="navbtns">
                   <FontAwesomeIcon icon={faUser}/>
                  <FontAwesomeIcon icon={faBell}/>
                  <p>{admin}</p>
               </div>
           </div>
       </div>
   </div>
  )
}

export default AdminNavbar
