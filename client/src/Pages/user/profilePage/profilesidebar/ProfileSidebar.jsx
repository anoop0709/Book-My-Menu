import { faHeart, faList, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import "./ProfileSidebar.css"
function ProfileSidebar({setPages,urlpage}) {
    const profileItems = ["Profile", "Change Password", "Bookings","Wishlist"];
    const icons = [faUser,faLock,faList,faHeart]
    const [active,setActive] = useState(0);
    useEffect(()=>{
      if(urlpage){
        const pageIndex = profileItems?.indexOf(urlpage)
        setActive(pageIndex);
      }
    },[urlpage])
  return (
    <>
    <div className="sidelistItem">
    {
        profileItems.map((item,index)=>(
            <div className={active === index ? "Item Active" : "Item"} key={index} onClick={() => setActive(index)}>
            <div onClick={()=>setPages(item)}>
             <FontAwesomeIcon className='iconsidebar' icon={icons[index]}/> {item}
            </div>
          </div>

        ))
      }

    </div>
     
    </>
  )
}

export default ProfileSidebar
