import React, { useState } from 'react'
import "./ProfileSidebar.css"
function ProfileSidebar({setPages}) {
    const profileItems = ["Profile", "Change Password", "Bookings","Wishlist"];
    const [active,setActive] = useState(0);
  return (
    <>
    <div className="sideListItems">
    {
        profileItems.map((item,index)=>(
            <div className={active === index ? "Item Active" : "Item"} key={index} onClick={() => setActive(index)}>
            <div onClick={()=>setPages(item)}>
              {item}
            </div>
          </div>

        ))
      }

    </div>
     
    </>
  )
}

export default ProfileSidebar
