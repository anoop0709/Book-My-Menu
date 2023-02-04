import React, { useEffect, useRef, useState } from 'react'
import "./Otp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faShield } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { signUp } from "../../actions/UserActions"
import { vendorSignup } from "../../actions/VendorActions"

function Otp({ user, values, data, setShowtoast, setSubmited , setOtppage}) {
  let currentOtpField = null;
  const inputRef = useRef(null);
  const arr = new Array(4).fill("");
  const [activeIndex, setActiveindex] = useState(0)
  const [otp, setOtp] = useState(arr);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[currentOtpField] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (!value) setActiveindex(currentOtpField - 1)
    else setActiveindex(currentOtpField + 1);
  }

  const handleKeydown = (e, idx) => {
    currentOtpField = idx;
    if (e.target.key === 'backspace') {
      setActiveindex(currentOtpField - 1);
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIndex])

  const submitOtp = () => {
    let otp_str = '';
    otp.forEach((el) => {
      otp_str += el;
    })
    if (user == 'user') {
      values.otp = Number(otp_str)
      dispatch(signUp(values, Navigate))
    };
    if (user === 'vendor') {
      data.otp = Number(otp_str)
      dispatch(vendorSignup(data, Navigate))
      setOtppage(false);
      setSubmited(true);
      setShowtoast(true);
     
    }

  }

  return (
    
    <div className="otpcontainer">
      <div className="otpwrapper">
        <h4>OTP</h4>
        <div className="iconDiv">
          <FontAwesomeIcon icon={faShield} className="icon" />
          <FontAwesomeIcon icon={faLock} className="lock" />
        </div>

        <div className="otpFields">
          {
            otp.map((_, index) => (
              <input
                key={index}
                type="number"
                onChange={handleChange}
                className="inpField"
                value={otp[index]}
                onKeyDown={(e) => handleKeydown(e, index)}
                ref={index === activeIndex ? inputRef : null}
              />
            ))
          }

        </div>
        <button className="btn btn-primary" onClick={submitOtp}>Submit</button>
      </div>


    </div>
  )
}

export default Otp
