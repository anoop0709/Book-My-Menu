import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function Otpform() {

    const [otpvalue,setOtpvalue] = useState({otp:""});
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const input = {
        id:"1",
        type:"number",
        name:"otp",
        placeholder:"enter OTP",
        errMessage:"Should be 4 digits",
        label:"OTP",
        required:"true",
        pattern:"^[0-9]{4,4}$"
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(otpLogin(otp),Navigate)
    }
    const onChange = (e)=>{
        setOtpvalue({...otpvalue,[e.target.name]:e.target.value});
    }

  return (
    <div>
      <div className="signInContainer">
                <div className="signInWrapper">
                    <div className="signinbox"> 
                        <div className="signInform">
                            <form onSubmit={handleSubmit}>       
                                    <Inputfield key={input.id} {...input}  onChange={onChange}/>
                                <div className="formBtn">
                                    <button type="submit">Enter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Otpform
