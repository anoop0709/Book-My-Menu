import React from 'react'
import { Route, Routes } from 'react-router'
import AllRestaurants from '../Components/userhomepageComponents/allRestaurants/AllRestaurants'
import ErrrorPage from '../Pages/errorpage/ErrorPage'
import Home from '../Pages/user/Home/Home'
import Login from '../Pages/user/Login/Login'
import Menu from '../Pages/user/menuList/Menu'
import RestSingleview from '../Pages/user/restaurantSingleView/RestSingleview'
import Signin from '../Pages/user/SignIn/Signin'

function UserRoutes() {
  return (
    <Routes>
    {/* user routes */}
    <Route exact path = "/" element={<Home/>}/>
    <Route exact path = ""  element={<Home/>}/>
    <Route path = "/signin"  element={<Signin/>}/>
    <Route path = "/login"  element={<Login/>}/>
    <Route path = "/restaurants" element={<AllRestaurants/>}/>
    <Route path = "/singleview"  element = {<RestSingleview/>}/>
    <Route path = "/menu"  element = {<Menu/>}/>
    <Route path='*' element={<ErrrorPage />} />     
    </Routes>

  )
}

export default UserRoutes
