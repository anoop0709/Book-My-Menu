import React,{useState} from 'react'
import Vendorloggedinnavbar from '../vendorloggedinnavbar/Vendorloggedinnavbar'
import "./Vendorloggedinhome.css";
import Vendorrestaurantpage from "../vendorrestaurant/vendorrestaurantmainpage/Vendorrestaurantpage";
import Vendorbookingspage from "../vendorbookings/vendorbookingpage/Vendorbookingspage";
import Vendorsalesreport from "../vendorsales/vendorsalesmainpage/Vendorsalesreport";
import Vendorprofilepage from "../vendorprofile/vendorprofilemainpage/Vendorprofilepage"

function Vendorloggedinhome() {
  const [pages,setPages] = useState("MY RESTAURANT")
  return (
    <div className="vendorHomeContainer">
     <Vendorloggedinnavbar setPages={setPages}/>
     {pages === "MY RESTAURANT" &&  <Vendorrestaurantpage/>}
     {pages === "BOOKINGS" && <Vendorbookingspage/>}
     {pages === "SALES REPORT" && <Vendorsalesreport/>}
     {pages === "ACCOUNT" && <Vendorprofilepage/>}
    </div>
  )
}

export default Vendorloggedinhome
