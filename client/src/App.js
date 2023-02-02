import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/user/Home/Home"
import Login from "./Pages/user/Login/Login";
import Signin from "./Pages/user/SignIn/Signin";
import AdminLogin from "./Pages/admin/AdminLogin/AdminLogin";
import AdminHome from "./Pages/admin/AdminHome/AdminHome"
import AdminProtectedPages from "./AdminProtectedPages";
import VendorProtectedPages from "./VendorProtectedPage";
import CreateAdmin from "./Pages/admin/CreateAdmin/CreateAdmin"
import Vendorhome from "./Pages/Vendors/Vendorhome/Vendorhome";
import VendorSignUp from "./Pages/Vendors/VendorSignUp/VendorSignUp";
import VendorLogin from "./Pages/Vendors/VendorLogin/VendorLogin";
import Main from "./Pages/admin/DashBoard/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import Vendordashboard from "./Pages/Vendors/vendorDashBoard/Vendordashboard";
import AllRestaurants from "./Components/userhomepageComponents/allRestaurants/AllRestaurants";
import RestSingleview from "./Pages/user/restaurantSingleView/RestSingleview";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* user routes */}
        <Route exact path = "/" element={<Home/>}/>
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/restaurants" element={<AllRestaurants/>}/>
        <Route path = "/singleview" element = {<RestSingleview/>}/>


          {/* admin routes */}
        <Route path = "/admin" element={<AdminLogin/>}/>
        <Route element={<AdminProtectedPages/>}>
        <Route path = "/adminhome" element={<AdminHome/>}/>
        <Route path="/createadmin" element={<CreateAdmin/>}/>
        <Route path="/admindashboard" element={<Main/>}/>

        </Route>


        {/* vendor routes */}
        <Route path="/vendor" element={<Vendorhome/>}/>
        <Route path="/vendorSignup" element={<VendorSignUp/>}/>
        <Route path="/vendorLogin" element={<VendorLogin/>}/>
        <Route element={<VendorProtectedPages/>}>
          <Route path="/vendordashborad" element={<Vendordashboard/>}/>
        </Route>
        
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
