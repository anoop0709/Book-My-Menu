import React,{useState} from 'react';
import './Sidebar.css';
import {SidebarData} from '../../../Data/Data';
import {UilSignOutAlt} from "@iconscout/react-unicons"

function Sidebar() {

    const [selected,setSelected] = useState(0);
  return (
    <div>
      <div className="sidebar">
          <div className="logo">
          <h1>Book My Menu
          </h1>
          <span>Admin</span>
          </div>

          <div className="menu">
              {SidebarData.map((item,index)=>(
                   <div className={selected===index ? 'menuItem active' : 'menuItem'}
                    key={index} onClick={()=>setSelected(index)}>
                   <div>
                     <item.icon/>
                     <span>{item.heading}</span>
                   </div>
                  
               </div>
                
              ))}
             <div className="menuItem">
                <div>
                  <UilSignOutAlt/>
                 
                </div>
               
            </div>

          </div>
      </div>
    </div>
  )
}

export default Sidebar
