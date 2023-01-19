import React,{useState} from 'react';
import './Sidebar.css';
import {SidebarData} from '../../../Data/Data';
import {UilSignOutAlt} from "@iconscout/react-unicons"
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function Sidebar({setPages}) {
  
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [selected,setSelected] = useState(0);
    
    const home = ()=>{
      Navigate('/adminhome')
    }
  
  return (
    <div>
      <div className="sidebar">
          <div className="logo">
          <h1 onClick={home}>Book My Menu
          </h1>
          <span>Admin</span>
          </div>

          <div className="menu">
              {SidebarData.map((item,index)=>(
                   <div className={selected===index ? 'menuItem active' : 'menuItem'}
                    key={index} onClick={()=>setSelected(index)}>
                   <div onClick={()=>setPages(item.heading)}>
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
