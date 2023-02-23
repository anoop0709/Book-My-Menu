import React, { useState } from 'react'
import "./SortByCusine.css"

function SortByCusine({setCusine,setLocation}) {
    const [selected,setSelected] = useState(0)
    const cusineType = ["ALL RESTAURANTS","AMERICAN","ARABIC","ITALIAN","SOUTH INDIAN","NORTH INDIAN","CHINEESE","THAI","VEGETARIAN","NON VEGETARIAN"]
  return (
   <div className="cusineBox">
       {
           cusineType.map((cusine,index)=>(
               <button key={index} className={selected === index ? "cusinebtn active" : "cusinebtn" } onClick={()=>{setCusine(cusineType[index]);setSelected(index);setLocation("")}}>{cusine}</button>
           ))
       }

   </div>
  )
}

export default SortByCusine
