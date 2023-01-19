import React from 'react'
import './Main.css'
import Cards from '../../../Components/AdminHomeComponents/Cards/Cards'
import Popular from '../../../Components/homepageComponents/PopularRestaurant/Popular'

function Main() {
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
