import React from "react";
import { Route, Routes } from "react-router-dom";
import AllRestaurants from "../Components/userhomepageComponents/allRestaurants/AllRestaurants";
import ErrrorPage from "../Pages/errorpage/ErrorPage";
import AvailableDate from "../Pages/user/availableDate/AvailableDate";
import BookingsPage from "../Pages/user/bookingsPage/BookingsPage";
import Home from "../Pages/user/Home/Home";
import Login from "../Pages/user/Login/Login";
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
      <Route exact path="" element={<Home />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/restaurants" element={<AllRestaurants />} />
      <Route exact path="/singleview" element={<RestSingleview />} />
      <Route element={<UserProtectedPages />}>
        <Route exact path="/availabledates" element={<AvailableDate />} />
        <Route exact path="/paymentpage" element={<Orderconfirm />} />
        <Route exact path="/user_bookings" element={<BookingsPage />} />
        <Route exact path = "/settings" element={<Profilepage/>}/>
        <Route exact path = "/wishlist" element={<Profilepage pages="Wishlist"/>}/>
        <Route exact path = "/wallet" element={<Wallet/>}/>
      </Route>
     
    </Routes>
  );
}

export default UserRoutes;
