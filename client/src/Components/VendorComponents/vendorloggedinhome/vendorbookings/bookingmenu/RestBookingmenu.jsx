import React, { useState } from 'react'

function RestBookingmenu({setBookings}) {
    const [selected,setSelected] = useState(0)
    const mainMenu = ["ALL BOOKINGS","NEW BOOKINGS"]
  return (
    <div className="mainMenu">
        <div className="mainmenuNav">
            {mainMenu.map((menu,index)=>(
                <div className={selected === index ? "Item Active" : "Item"} key={index} onClick={() => setSelected(index)}>
                <div onClick={()=>setBookings(menu)}>
                  {menu}
                </div>
              </div>
            ))}

        </div>

    </div>
  )
}

export default RestBookingmenu
