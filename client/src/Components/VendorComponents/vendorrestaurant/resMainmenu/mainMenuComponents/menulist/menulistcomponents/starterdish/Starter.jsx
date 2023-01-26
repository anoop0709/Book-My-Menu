import React from 'react'
import "./Starter.css"

function Starter() {
  const addStarter = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);

  }
  return (
    <div className="StarterContainer">
      <div className="StarterWrapper">
        <div className="Starter">
          <form onSubmit={(e)=>addStarter(e)}>
            <input name="itemName" type="text" placeholder="Dish name"/>
            <input name="itemDescription" type="text" placeholder="Description"/>
            <input name="itemPrice" type="number" placeholder="price" />
            <button type="submit">ADD STARTER</button>
          </form>      
        </div>
      </div>
      <div className="starterList">
          <h1>hai new div</h1>
        </div>
    
    </div>
  )
}

export default Starter
