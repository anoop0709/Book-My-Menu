import React, { useEffect } from 'react'
import './Main.css'
import Cards from '../../../Components/AdminHomeComponents/Cards/Cards'
import Popular from '../../../Components/userhomepageComponents/PopularRestaurant/Popular'
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
     <div className="dashWrapper">
       <Cards/>
       <Popular/>
     </div>
   </div>
  )
}

export default Main
