import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router';

function VendorProtectedPage() {
  
         const [vendor,setVendor]= useState(JSON.parse(localStorage.getItem('vendor')));
  return vendor ? <Outlet/> : <Navigate to="/vendor"/>    

  
}

export default VendorProtectedPage
