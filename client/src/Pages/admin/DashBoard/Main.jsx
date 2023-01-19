import React, { useEffect } from 'react'
import './Main.css'
import Cards from '../../../Components/AdminHomeComponents/Cards/Cards'
import Popular from '../../../Components/homepageComponents/PopularRestaurant/Popular'
import Sidebar from '../../../Components/AdminHomeComponents/Sidebar/Sidebar'
import AdminNavbar from '../../../Components/AdminHomeComponents/AdminNavbar/AdminNavbar'
import { useNavigate } from 'react-router'

function Main() {
  
  const admin = JSON.parse(localStorage.getItem('admin'))
  const Navigate = useNavigate()
  console.log(admin);
  useEffect(() => {
    if (!admin?.Token) {
      Navigate('/admin')
    }
  })
  return (
   <div className="MainDash">
       <Cards/>
       <Popular/>
       <Popular/>
       <Popular/>
   </div>
  )
}

export default Main
