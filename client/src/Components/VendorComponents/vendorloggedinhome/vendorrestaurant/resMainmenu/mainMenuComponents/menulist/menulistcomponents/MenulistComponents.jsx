import React, { useState } from 'react'
import "./MenulistComponents.css"

function MenulistComponents({setMenu,tabNames}) {
    const [selected,setSelected] = useState(0)
    const mainMenu = ['starter','sidedish','maindish','dessert','combos','beverages']
  return (
    <div className="mainMenu">
    <div className="mainmenuNav">
      {mainMenu.map((menu,index)=>(
                <div className={selected === index ? "Item Active" : "Item"} key={index} onClick={() => setSelected(index)}>
                <div onClick={()=>setMenu(menu)}>
                  {tabNames[index]} 
                </div>
              </div>
            ))}
     </div>
    </div>
  )
}

export default MenulistComponents
