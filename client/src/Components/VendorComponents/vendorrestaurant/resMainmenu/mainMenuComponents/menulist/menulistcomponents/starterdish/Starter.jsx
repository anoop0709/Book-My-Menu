import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStarter } from '../../../../../../../../actions/VendorActions';
import "./Starter.css"


function Starter() {
  const menuList = useSelector((state) => { return state.Restmenu.authData});
  console.log(menuList);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('vendor')).email);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: ""
  })

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const AddStarter = () => {
    console.log(data);
    dispatch(addStarter(data, email));


  }
  return (
    <div className="StarterContainer">
      <div className="StarterWrapper">
        <div className="Starter">
          <input name="itemName" type="text" placeholder="Dish name" onChange={onChange} />
          <input name="itemDescription" type="text" placeholder="Description" onChange={onChange} />
          <input name="itemPrice" type="number" placeholder="price" onChange={onChange} />

          <button onClick={AddStarter} className="sbtBtn">ADD STARTER</button>
        </div>
      </div>
      <div className="starterList">
        <table>
          <tr>
            <th>Dish Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
          { menuList?.starter?.map((item,index) => (
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{item.itemDescription}</td>
              <td>{item.itemPrice}</td>
            </tr>
          ))
          }
        </table>
      </div>

    </div>
  )
}

export default Starter
