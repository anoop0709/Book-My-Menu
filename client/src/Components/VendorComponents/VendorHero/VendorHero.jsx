import React from 'react'
import "./VendorHero.css"
import fullPallette from "../../../images/theenchantedplate.jpg"
function VendorHero() {
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
                  <button>Register</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default VendorHero
