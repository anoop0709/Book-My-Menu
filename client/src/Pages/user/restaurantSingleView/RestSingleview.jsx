import React from 'react'
import { useLocation } from 'react-router';
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar"

function RestSingleview() {
    const Location = useLocation();
    const {restId} = Location.state;
  return (
    <>
    <Navbar/>
    <div className="singleviewContainer">
hello
    </div>


      
    </>
  )
}

export default RestSingleview
