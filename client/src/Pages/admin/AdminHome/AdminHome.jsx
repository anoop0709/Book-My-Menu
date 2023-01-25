import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AdminNavbar from '../../../Components/AdminHomeComponents/AdminNavbar/AdminNavbar'
import Main from '../DashBoard/Main'
import Sidebar from '../../../Components/AdminHomeComponents/Sidebar/Sidebar'
import './AdminHome.css'
import Allusers from '../AllUsers/Allusers'
import { useDispatch} from 'react-redux'
import {getAllusers,getAllvendors,newVendors,allrestaurant} from "../../../actions/AdminActions"
import Allvendors from '../AllVendors/Allvendors'
import ApproveVendors from '../ApproveVendors/ApproveVendors'
function AdminHome() {

const dispatch = useDispatch();
  const [pages,setPages] = useState("Dashboard")
  console.log(pages);
  const admin = JSON.parse(localStorage.getItem('admin'))
  const Navigate = useNavigate();


  useEffect(() => {
    if (!admin?.Token) {
      Navigate('/admin')
    }
      dispatch(getAllusers())
      dispatch(getAllvendors())
      dispatch(newVendors())
      dispatch(allrestaurant())

  },[pages])
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setPages={setPages}/>
        <AdminNavbar />
      
        {pages == "Dashboard" && <Main/>}
        {pages == "Customers" && <Allusers/>}
        {pages == "Vendors" && <Allvendors/>}
        {pages == "Approve Vendors" && <ApproveVendors/>}
      </div>
    </div>
  )
}

export default AdminHome
