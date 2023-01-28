import React from 'react';
import { Navigate, Outlet } from 'react-router';

function VendorProtectedPage() {
  
  const vendor= JSON.parse(localStorage.getItem('vendor'))?.Token;
  return vendor ? <Outlet/> : <Navigate to="/vendor"/>    
}

export default VendorProtectedPage
