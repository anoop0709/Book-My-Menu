import React from 'react'
import { useLocation } from 'react-router'
import Footer from '../../../Components/userhomepageComponents/Footer/Footer';
import Navbar from '../../../Components/userhomepageComponents/Navbar/Navbar';
import "./Orderconfirm.css"

function Orderconfirm() {
    const Location = useLocation();
     const {restaurant,data,time,reducerFunction} = Location.state;
    console.log(restaurant,data,time,reducerFunction);
  return (
    <>
    <Navbar/>
    <Footer/>
    </>
  )
}

export default Orderconfirm
