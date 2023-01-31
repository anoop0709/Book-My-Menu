import React, { useState } from 'react'

function EditImageComponent({setMenu,Imagetabs}) {
  
    const [selected,setSelected] = useState(0)
    const imageMenu = ['all images','add image']
  return (
    <div className="mainMenu">
    <div className="mainmenuNav">
      {imageMenu.map((menu,index)=>(
                <div className={selected === index ? "Item Active" : "Item"} key={index} onClick={() => setSelected(index)}>
                <div onClick={()=>setMenu(menu)}>
                  {Imagetabs[index]} 
                </div>
              </div>
            ))}
     </div>
    </div>
  )
}
  


export default EditImageComponent
