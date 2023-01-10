import React from 'react'
import { PopupMenu } from "react-simple-widgets";
import "./profilePop.css";
function ProfilePop(props) {
  return (
    <div id="app">
    <div className="text-end">
         <button className="navButtons">
            Welcome back, {props.user.user}
          </button>
       <PopupMenu>
      
          <button className="navButtons">
            Profile
          </button>

          <div className="card">
            <div className="card-body">
              <div id="circle-avatar" className="text-center mx-auto mb-4">
                <span>{props.user.user[0]}</span>
              </div>
              <div className="textContainer">
                  <div className="textWrapper">
                  <h3>{props.user.user}</h3>
                  <h5 style={{color:"black"}}>{props.user.Email}</h5>
                  <button className="navButtons" onClick={props.settings}>Account Settings</button>
                  <button className="navButtons" onClick={props.logout}>LogOut</button>

                  </div>
            </div>
            </div>
          </div>
        </PopupMenu>
    </div>
    </div>
  )
}

export default ProfilePop
