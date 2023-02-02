import React from 'react'
import { Navigate, Outlet } from 'react-router';

function UserProtectedPages() {

    const admin= JSON.parse(localStorage.getItem('profile'))?.Token;
  return admin ? <Outlet/> : <Navigate to="/login"/>
   
}

export default UserProtectedPages
