import React from 'react'
import { Route, Routes } from 'react-router'
import AllRestaurants from '../Components/userhomepageComponents/allRestaurants/AllRestaurants'
import ErrrorPage from '../Pages/errorpage/ErrorPage'
import AvailableDate from '../Pages/user/availableDate/AvailableDate'
import Home from '../Pages/user/Home/Home'
import Login from '../Pages/user/Login/Login'
import Menu from '../Pages/user/menuList/Menu'
import Orderconfirm from '../Pages/user/orderconfirmpage/Orderconfirm'
import RestSingleview from '../Pages/user/restaurantSingleView/RestSingleview'
import Signin from '../Pages/user/SignIn/Signin'

function UserRoutes() {
  return (
    <Routes>
    {/* <Route exact path = "/"  element={<Home/>}/> */}
    <Route path = ""  element={<Home/>}/>
    <Route path = "/signin"  element={<Signin/>}/>
    <Route path = "/login"  element={<Login/>}/>
    <Route path = "/restaurants" element={<AllRestaurants/>}/>
    <Route path = "/singleview"  element = {<RestSingleview/>}/>
    <Route path = "/menu"  element = {<Menu/>}/>   
    <Route path = "/availabledates" element={<AvailableDate/>}/>
    <Route path = "/paymentpage"  element={<Orderconfirm/>}/>
    </Routes>

  )
}

export default UserRoutes
