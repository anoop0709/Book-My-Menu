import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import "./AdminNavbar.css"

function AdminNavbar() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('admin')).Admin);

const createAdmin = ()=>{
    Navigate('/createadmin')
}
const logOut = ()=>{
    dispatch({type:"ADMINLOGOUT"})
    Navigate("/admin");
    setUser(null);
}
  return (
   <div className="container">
       <div className="wrapper">
           <div className="navItems">
               <div className="navbtns">
                      
                           <h3>{user}</h3>
                           <button className="navButtons" onClick={createAdmin}>Create Admin</button>
                           <button className="navButtons" onClick={logOut}>Logout</button>
                       
               </div>
           </div>
       </div>
   </div>
  )
}

export default AdminNavbar
