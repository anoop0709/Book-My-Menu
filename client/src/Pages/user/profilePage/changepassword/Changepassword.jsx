import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updatePass } from '../../../../actions/UserActions';
import "./Changepassword.css"

function Changepassword({user}) {
  console.log(user);
  const dispatch = useDispatch();
  const [changepassword,setChangepassword] = useState({
    password:"",
    newpassword:""
  });
  const handleChange = (e)=>{
    setChangepassword({...changepassword,[e.target.name]:e.target.value})

  }
  const updatePassword = ()=>{
 dispatch(updatePass({password:changepassword,userid:user?._id}))
  }
  console.log(changepassword);
  return (
    <div className='changePasswordContainer'>
     
      <div className="passwordWrapper">
    
        <form action="">
        <h6>Change Password</h6>
          <input type="password"name='password' placeholder='Old Password' onChange={handleChange}/>
          <input type="password" name='newpassword' placeholder='New Password' onChange={handleChange}/>
          <div className="btnUpdate">
          <button onClick={updatePassword}>Update</button>
          </div>
        </form>
      </div>
        
      
    </div>
  )
}

export default Changepassword
