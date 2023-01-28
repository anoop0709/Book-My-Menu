import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../../../../../actions/VendorActions'
import "./Menulist.css"

import MenulistComponents from './menulistcomponents/MenulistComponents'

import Starter from './menulistcomponents/starterdish/Starter'

function Menulist() {
  const menuList = useSelector((state)=>{return state.Restmenu.authdata});
  const [vendor,setVendor] = useState(JSON.parse(localStorage.getItem('vendor')).email);
  const [menu,setMenu] = useState("STARTER");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMenu(vendor))
  },[menu,menuList])
 const collectionName = ['starter','sidedish','maindish','dessert','combos','beverages']
 console.log(collectionName[0]);
  return (
    <div className="resMainconatainer">
    <div className="resMainwrapper">
      <div className="resMainmenu">
        <div className="menulist-items">
          <MenulistComponents setMenu = {setMenu}/>
        </div>
          {menu === "STARTER" && <Starter collectionName = {collectionName[0]}/>}
          {menu === "SIDE DISH" && <Starter collectionName = {collectionName[1]}/>}
          {menu === "MAIN DISH" && <Starter collectionName = {collectionName[2]}/>}
          {menu === "DESSERT" && <Starter collectionName = {collectionName[3]}/>}
          {menu === "COMBOS" && <Starter collectionName = {collectionName[4]}/>}
          {menu === "BEVERAGES" && <Starter collectionName = {collectionName[5]}/>}
        </div>
      </div>
    </div>
  )
}

export default Menulist
