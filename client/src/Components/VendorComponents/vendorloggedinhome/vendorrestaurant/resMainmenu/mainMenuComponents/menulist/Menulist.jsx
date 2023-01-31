import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../../../../../../actions/VendorActions'
import "./Menulist.css"

import MenulistComponents from './menulistcomponents/MenulistComponents'

import Dish from './menulistcomponents/starterdish/Dish'

function Menulist() {
  const menuList = useSelector((state)=>{return state.Restmenu.authdata});
  const [vendor,setVendor] = useState(JSON.parse(localStorage.getItem('vendor')).email);
  const [menu,setMenu] = useState("starter");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMenu(vendor))
  },[menu,menuList])
 const collectionNames = ['starter','sidedish','maindish','dessert','combos','beverages']
 const tabNames = ["STARTER","SIDE DISH","MAIN DISH","DESSERT","COMBOS","BEVERAGES"]
 
  return (
    <div className="resMainconatainer">
    <div className="resMainwrapper">
      <div className="resMainmenu">
        <div className="menulist-items">
          <MenulistComponents setMenu = {setMenu} tabNames={tabNames}/>
        </div>
        {
          collectionNames.map((Name,index)=>(
            menu === Name && <Dish collectionName = {Name} key={index} />

          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Menulist
