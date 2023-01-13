
import './AdminLogin.css'
import Person2 from '../../../images/person1.webp'
import React, { useState } from "react";
import Inputfield from "../../../Components/signupcomponent/inputComponent/Inputfield";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../actions/signup"
import { useSelector } from "react-redux";

function AdminLogin() {
  const Error = useSelector((state) => {
    console.log(state.AdminAuthReducer.error);
    return state.AdminAuthReducer.error;
  });

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [adminlogvalues, setAdminlogvalues] = useState({
    email: "",
    password: ""
  })
  const inputs = [
    {
      id: "1",
      type: "email",
      name: "email",
      placeholder: "Email",
      errMessage: "Should be a valid email",
      label: "Email",
      required: "true",
      pattern: "^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    },
    {
      id: "2",
      type: "password",
      name: "password",
      placeholder: "Password",
      errMessage: "Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
      label: "Password",
      required: "true",
      pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$"
    }
  ]
  const onChange = (e) => {
    setAdminlogvalues({ ...adminlogvalues, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(adminlogvalues, Navigate));
  }
  console.log(adminlogvalues);
  return (


    <div>

      <div className="signInContainer" >
        <div className="signInWrapper">

          <div className="signinbox" >


            <div className="imgDiv">
              <img src={Person2} alt="" />
            </div>
            <div className="signInform">
              <div className="h1txt">
                <h1>ADMIN LOGIN</h1>
              </div>
              {Error && (
                <div style={{ border: '2px solid red', borderRadius: '5px', marginBottom: '20px' }}>
                  <p style={{ color: 'red', margin: '5px' }}>Wrong Email address or Password</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                  <Inputfield key={input.id} {...input} onChange={onChange} />

                ))}

                <div className="formBtn">
                  <button type="submit">Login</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default AdminLogin
