import React from 'react'
import "./VendorHero.css"
import fullPallette from "../../../images/theenchantedplate.jpg"
import { useNavigate } from 'react-router'
function VendorHero() {
const navigate = useNavigate()
  function Register() {
    navigate('/vendorSignup')
}
  return (
    <div className="VendorHeroContainer">
      <div className="VendorHeroWrapper">
          <div className="imgdiv">
              <img src={fullPallette} alt=""/>
              <div className="HeroText">
                  <p className="HeroHeading">
                      Be Our Partner
                  </p>
                  <span>Register to start Business with us</span>
                  <button onClick={Register}>Register</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default VendorHero
