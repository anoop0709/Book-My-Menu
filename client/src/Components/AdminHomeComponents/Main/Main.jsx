import React from 'react'
import './Main.css'
import Cards from '../Cards/Cards'
import Popular from '../../homepageComponents/PopularRestaurant/Popular'

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
