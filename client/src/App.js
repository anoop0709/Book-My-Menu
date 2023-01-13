import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/user/Home/Home"
import Login from "./Pages/user/Login/Login";
import Signin from "./Pages/user/SignIn/Signin";
import AdminLogin from "./Pages/admin/AdminLogin/AdminLogin";
import AdminHome from "./Pages/admin/AdminHome/AdminHome"
import AdminProtectedPages from "./AdminProtectedPages";
import CreateAdmin from "./Pages/admin/CreateAdmin/CreateAdmin"
import Vendorhome from "./Pages/Vendors/Vendorhome/Vendorhome";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* user routes */}
        <Route exact path = "/" element={<Home/>}/>
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/login" element={<Login/>}/>


          {/* admin routes */}
        <Route path = "/admin" element={<AdminLogin/>}/>
        <Route element={<AdminProtectedPages/>}>
        <Route path = "/adminhome" element={<AdminHome/>}/>
        <Route path="/createadmin" element={<CreateAdmin/>}/>
        </Route>


        {/* vendor routes */}
        <Route path="/vendor" element={<Vendorhome/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
