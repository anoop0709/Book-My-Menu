import React, { useState } from 'react';
import "./Resmainmenu.css";

function Resmainmenu({setMenu}) {
    const [selected,setSelected] = useState(0)
    const mainMenu = ["MENU","IMAGES"]
  return (
    <div className="mainMenu">
        <div className="mainmenuNav">
            {mainMenu.map((menu,index)=>(
                <div className={selected === index ? "Item Active" : "Item"} key={index} onClick={() => setSelected(index)}>
                <div onClick={()=>setMenu(menu)}>
                  {menu}
                </div>
              </div>
            ))}

        </div>

    </div>
  )
}

export default Resmainmenu
