import React from 'react'
import './Main.css'
import Cards from '../Cards/Cards'
import Popular from '../../homepageComponents/PopularRestaurant/Popular'

function Main() {
  return (
   <div className="MainDash">
       <h1>Dashboard</h1>
       <Cards/>
       <Popular/>
   </div>
  )
}

export default Main
