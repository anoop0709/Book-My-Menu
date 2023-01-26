import React, { useState } from 'react'
import "./Menulist.css"
import Bevereges from './menulistcomponents/beverages/Beverages'
import Combos from './menulistcomponents/combos/Combos'
import Dessert from './menulistcomponents/dessert/Dessert'
import Maindish from './menulistcomponents/maindish/Maindish'
import MenulistComponents from './menulistcomponents/MenulistComponents'
import Sidedish from './menulistcomponents/sidedish/Sidedish'
import Starter from './menulistcomponents/starterdish/Starter'

function Menulist() {
  const [menu,setMenu] = useState("STARTER")
 
  return (
    <div className="resMainconatainer">
    <div className="resMainwrapper">
      <div className="resMainmenu">
        <div className="menulist-items">
          <MenulistComponents setMenu = {setMenu}/>
        </div>
          {menu === "STARTER" && <Starter/>}
          {menu === "SIDE DISH" && <Sidedish/>}
          {menu === "MAIN DISH" && <Maindish/>}
          {menu === "DESSERT" && <Dessert/>}
          {menu === "COMBOS" && <Combos/>}
          {menu === "BEVERAGES" && <Bevereges/>}
        </div>
      </div>
    </div>
  )
}

export default Menulist
