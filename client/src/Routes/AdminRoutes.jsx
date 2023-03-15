import React from 'react'
import { Route, Routes } from 'react-router'
import AdminProtectedPages from '../AdminProtectedPages'
import  AdminLogin  from '../Pages/admin/AdminLogin/AdminLogin'
import AdminHome from '../Pages/admin/AdminHome/AdminHome'
import CreateAdmin from '../Pages/admin/CreateAdmin/CreateAdmin'
import Main from '../Pages/admin/DashBoard/Main'
import ErrrorPage from '../Pages/errorpage/ErrorPage'


function AdminRoutes() {
    return (
        <Routes>
            <Route exact path="/admin" element={<AdminLogin />} />
          
            <Route  element={<AdminProtectedPages />}>
                <Route exact path="/adminhome" element={<AdminHome />} />
                <Route exact path="/createadmin" element={<CreateAdmin />} />
                <Route exact path="/admindashboard" element={<Main />} />  
            
            </Route>
        </Routes>
    )
}

export default AdminRoutes
