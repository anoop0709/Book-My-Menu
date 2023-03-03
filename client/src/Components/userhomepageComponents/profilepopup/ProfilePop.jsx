import React from 'react'
import { PopupMenu } from "react-simple-widgets";
import "./profilePop.css";
function ProfilePop(props) {
  console.log(props);
  return (
    <div>
      <div className="text-end">
        <button className="navButtons">
          Welcome back, {props?.user?.user}
        </button>
        <PopupMenu>

          <button className="navButtons">
            Profile
          </button>

          <div className="card">
            <div className="card-body">
              <div id="circle-avatar" className="text-center mx-auto mb-4">
                <span>{props?.user?.user[0]}</span>
              </div>
              <div className="textContainer">
                <div className="textWrapper">
                  <h5>{props?.user?.user}</h5>
                  <h6 style={{ color: "black" }}>{props?.user?.Email}</h6>
                  <div className="buttondiv">
                  <button className="navButtons" onClick={props?.settings}>Account Settings</button>
                  <button className="navButtons" onClick={props?.logout}>Log Out</button>
                  </div>

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
