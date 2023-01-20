import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import "./AdminNavbar.css"

function AdminNavbar() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [admin,setAdmin] = useState(JSON.parse(localStorage.getItem('admin')).Admin);

const createAdmin = ()=>{
    Navigate('/createadmin')
}

  return (
   <div className="container">
       <div className="wrapper">
           <div className="navItems">
               <div className="navbtns">
                      
                           <h3>{admin}</h3>
                           <button className="navButtons" onClick={createAdmin}>Create Admin</button>
                       
               </div>
           </div>
       </div>
   </div>
  )
}

export default AdminNavbar
