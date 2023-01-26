import React, { useState } from 'react'
import Imagesettings from '../resMainmenu/mainMenuComponents/imagesettings/Imagesettings';
import Menulist from '../resMainmenu/mainMenuComponents/menulist/Menulist';
import Resmainmenu from '../resMainmenu/Resmainmenu'
import "./Vendorrestaurantpage.css"

function Vendorrestaurantpage() {
  const [menu,setMenu] = useState("MENU");
  return (
    <div className="resMainconatainer">
      <div className="resMainwrapper" >
        <div className="resMainmenu">
          <Resmainmenu setMenu = {setMenu}/>
        </div>
          {menu === "MENU" && <Menulist/>}
          {menu === "IMAGES" && <Imagesettings/>}
      </div>

     
    </div>
  )
}

export default Vendorrestaurantpage
