import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrrorPage from "./Pages/errorpage/ErrorPage";
import Vendorhome from "./Pages/Vendors/Vendorhome/Vendorhome";
import VendorSignUp from "./Pages/Vendors/VendorSignUp/VendorSignUp";
import VendorLogin from "./Pages/Vendors/VendorLogin/VendorLogin";
import VendorProtectedPage from "./VendorProtectedPage";
import Vendordashboard from "./Pages/Vendors/vendorDashBoard/Vendordashboard";
import Home from "./Pages/user/Home/Home";
import Signin from "./Pages/user/SignIn/Signin";
import Login from "./Pages/user/Login/Login";
import AllRestaurants from "./Components/userhomepageComponents/allRestaurants/AllRestaurants";
import RestSingleview from "./Pages/user/restaurantSingleView/RestSingleview";
import UserProtectedPages from "./UserProtectedPages";
import AvailableDate from "./Pages/user/availableDate/AvailableDate";
import Orderconfirm from "./Pages/user/orderconfirmpage/Orderconfirm";
import BookingsPage from "./Pages/user/bookingsPage/BookingsPage";
import Profilepage from "./Pages/user/profilePage/Profilepage";
import Wallet from "./Pages/user/wallet/Wallet";
import AdminLogin from "./Pages/admin/AdminLogin/AdminLogin";
import AdminProtectedPages from "./AdminProtectedPages";
import AdminHome from "./Pages/admin/AdminHome/AdminHome";
import CreateAdmin from "./Pages/admin/CreateAdmin/CreateAdmin";
import Main from "./Pages/admin/DashBoard/Main";
import Menu from "./Pages/user/menuList/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* vendor routes */}

        <Route exact path="/vendor" element={<Vendorhome />} />
        <Route exact path="/vendorSignup" element={<VendorSignUp />} />
        <Route exact path="/vendorLogin" element={<VendorLogin />} />
        <Route element={<VendorProtectedPage />}>
          <Route exact path="/vendordashborad" element={<Vendordashboard />} />
        </Route>

        {/* user routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/restaurants" element={<AllRestaurants />} />
        <Route exact path="/singleview" element={<RestSingleview />} />
        <Route element={<UserProtectedPages />}>
          <Route exact path="/availabledates" element={<AvailableDate />} />
          <Route exact path="/paymentpage" element={<Orderconfirm />} />
          <Route exact path="/user_bookings" element={<BookingsPage />} />
          <Route exact path="/settings" element={<Profilepage />} />
          <Route exact path="/wishlist" element={<Profilepage pages="Wishlist" />}/>
          <Route exact path="/wallet" element={<Wallet />} />
          <Route exact path="/menu" element={<Menu/>}/>
        </Route>

        {/* admin routes */}

        <Route exact path="/admin" element={<AdminLogin />} />
        <Route element={<AdminProtectedPages />}>
          <Route exact path="/adminhome" element={<AdminHome />} />
          <Route exact path="/createadmin" element={<CreateAdmin />} />
          <Route exact path="/admindashboard" element={<Main />} />
        </Route>

        {/* error routes */}

        <Route path="*" element={<ErrrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
