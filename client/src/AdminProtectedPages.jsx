import React from 'react'
import { Navigate, Outlet } from 'react-router';

function AdminProtectedPages() {

    const admin= JSON.parse(localStorage.getItem('admin'))?.Token;
  return admin ? <Outlet/> : <Navigate to="/admin"/>
   
}

export default AdminProtectedPages
