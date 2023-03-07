import React from 'react'
import { Route, Routes, Switch } from 'react-router'
import ErrrorPage from '../Pages/errorpage/ErrorPage'
import Vendordashboard from '../Pages/Vendors/vendorDashBoard/Vendordashboard'
import Vendorhome from '../Pages/Vendors/Vendorhome/Vendorhome'
import VendorLogin from '../Pages/Vendors/VendorLogin/VendorLogin'
import VendorSignUp from '../Pages/Vendors/VendorSignUp/VendorSignUp'
import VendorProtectedPage from '../VendorProtectedPage'

function VendorRoutes() {
  return (
    
    <Routes>
         <Route path="/vendor"  element={<Vendorhome/>}/>
        <Route path="/vendorSignup" element={<VendorSignUp/>}/>
        <Route path="/vendorLogin"  element={<VendorLogin/>}/>  
        <Route element={<VendorProtectedPage/>}>
          <Route path="/vendordashborad"  element={<Vendordashboard/>}/>     
        </Route> 
        {/* <Route  path= "*" element={<ErrrorPage/>}/>  */}
    </Routes>

  )
}

export default VendorRoutes
