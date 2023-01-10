import React from 'react'
import Main from '../../Components/AdminHomeComponents/Main/Main'
import Sidebar from '../../Components/AdminHomeComponents/Sidebar/Sidebar'
import './AdminHome.css'
function AdminHome() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <Main/>
      </div>  
    </div>
  )
}

export default AdminHome
