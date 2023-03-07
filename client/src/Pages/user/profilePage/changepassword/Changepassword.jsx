import { faCircleCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get_user_info, updatePass } from '../../../../actions/UserActions';
import Inputfield from '../../../../Components/signupcomponent/inputComponent/Inputfield';
import "./Changepassword.css"

function Changepassword() {
  const user = useSelector((state)=>{return state?.UserInfo.authData});
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const passwordSuccess = useSelector((state)=>{return state.PasswordChange});
  console.log(passwordSuccess);
  console.log(user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [changepassword,setChangepassword] = useState({
    password:"",
    newpassword:""
  });
  const userid = user?._id;

  const input = {
    type: "password",
    errMessage: "Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
    required: "true",
    pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$"
  }

  useEffect(() => {
    console.log("password change render");
    if(profile?.Token){
      dispatch(get_user_info(profile?.userId,Navigate))
    }
   },[changepassword]);



  const handleChange = (e)=>{
    setChangepassword({...changepassword,[e.target.name]:e.target.value})

  }
  const updatePassword = ()=>{
     dispatch(updatePass({password:changepassword,userid:userid}))
  }
  console.log(changepassword);
  return (
    <>
    {passwordSuccess?.authData && (
      <div className='message'>
        <p>{passwordSuccess.authData} <span><FontAwesomeIcon icon={faCircleCheck}/></span></p>
      </div>
    )}
    {passwordSuccess?.error && (
      <div className='messageError'>
        <p>{passwordSuccess.error} <span><FontAwesomeIcon icon={faXmarkCircle}/></span></p>
      </div>
    )}

    <div className='changePasswordContainer'>
     
      <div className="passwordWrapper">
    
        <div className='inputdiv'>
        <h6>Change Password</h6>
          <Inputfield {...input} name='password' placeholder='Old Password' onChange={handleChange}  />
          <Inputfield {...input} name='newpassword' placeholder='New Password' onChange={handleChange} />
          <div className="btnUpdate">
            {
              input.errMessage ? (
                <button disabled>Update</button>
              ):(
                <button onClick={updatePassword}>Update</button>
              )
            }
          </div>
        </div>
      </div>
        
      
    </div>
    </>
  )
}

export default Changepassword
