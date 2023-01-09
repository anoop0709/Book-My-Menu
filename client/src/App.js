import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login";
import Signin from "./Pages/SignIn/Signin";
import AdminHome from "./Pages/AdminHome/AdminHome"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/admin" element={<AdminHome/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
