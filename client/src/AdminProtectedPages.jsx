import React,{useState} from 'react'
import { Navigate, Outlet } from 'react-router';

function AdminProtectedPages() {

    const [admin,setAdmin]= useState(JSON.parse(localStorage.getItem('admin')));
  return admin ? <Outlet/> : <Navigate to="/admin"/>
   
}

export default AdminProtectedPages
