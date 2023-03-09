import React from "react";
import { Route, Routes } from "react-router-dom";
import AllRestaurants from "../Components/userhomepageComponents/allRestaurants/AllRestaurants";
import ErrrorPage from "../Pages/errorpage/ErrorPage";
import AvailableDate from "../Pages/user/availableDate/AvailableDate";
import BookingsPage from "../Pages/user/bookingsPage/BookingsPage";
import Home from "../Pages/user/Home/Home";
import Login from "../Pages/user/Login/Login";
import Menu from "../Pages/user/menuList/Menu";
import Orderconfirm from "../Pages/user/orderconfirmpage/Orderconfirm";
import Profilepage from "../Pages/user/profilePage/Profilepage";
import RestSingleview from "../Pages/user/restaurantSingleView/RestSingleview";
import Signin from "../Pages/user/SignIn/Signin";
import Wallet from "../Pages/user/wallet/Wallet";
import UserProtectedPages from "../UserProtectedPages.jsx";

function UserRoutes() {
  return (
    <Routes>
      <Route exact path = "/"  element={<Home/>}/>   
      <Route path="" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/restaurants" element={<AllRestaurants />} />
      <Route path="/singleview" element={<RestSingleview />} />
      <Route element={<UserProtectedPages />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/availabledates" element={<AvailableDate />} />
        <Route path="/paymentpage" element={<Orderconfirm />} />
        <Route path="/user_bookings" element={<BookingsPage />} />
        <Route path = "/settings" element={<Profilepage/>}/>
        <Route path = "/wallet" element={<Wallet/>}/>
      </Route>
      {/* <Route exact path= "*" element={<ErrrorPage/>}/>  */}
    </Routes>
  );
}

export default UserRoutes;
