import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import ErrrorPage from "./Pages/errorpage/ErrorPage";


function App() {
  
  return (
      <BrowserRouter>  
        <UserRoutes />
        <AdminRoutes />
        <VendorRoutes />
        {/* <Routes>
        <Route exact path= "*" element={<ErrrorPage/>}/>
      </Routes> */}
       
      </BrowserRouter>
  );
}

export default App;
