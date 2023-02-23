import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import VendorRoutes from "./Routes/VendorRoutes";


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
