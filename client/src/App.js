import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      </BrowserRouter>
    
  );
}

export default App;
