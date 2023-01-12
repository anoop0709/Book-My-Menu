import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AdminNavbar from '../../Components/AdminHomeComponents/AdminNavbar/AdminNavbar'
import Main from '../../Components/AdminHomeComponents/Main/Main'
import Sidebar from '../../Components/AdminHomeComponents/Sidebar/Sidebar'
import './AdminHome.css'
function AdminHome() {
  const admin = JSON.parse(localStorage.getItem('admin'))
  const Navigate = useNavigate()
  console.log(admin);
  useEffect(()=>{
if(!admin?.email){
Navigate('/admin')
}
  },[])
  return (
    <div className="App">
      <div className="AppGlass">
       
        <Sidebar/>
        <AdminNavbar/>
        <Main/>
      </div>  
    </div>
  )
}

export default AdminHome
