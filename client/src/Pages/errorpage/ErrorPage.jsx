import React from 'react'
import "./ErrorPage.css"
import error from "../../images/404.png"
import Navbar from '../../Components/userhomepageComponents/Navbar/Navbar'
function ErrrorPage() {
  return (
    <>
    <Navbar/>
      <div className="errorcontainer">
        <div className="errorwrapping">
          <div className="error">
            <img style={{objectFit:"cover",width:"700px"}} src={error} alt="" />
          </div>

        </div>
      </div>
    </>
  )
}

export default ErrrorPage
