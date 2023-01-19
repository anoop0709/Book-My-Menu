import './Login.css'
import Navbar from '../../../Components/homepageComponents/Navbar/Navbar';
import Person2 from '../../../images/person2.jpeg'
import React, { useState } from "react";
import Inputfield from "../../../Components/signupcomponent/inputComponent/Inputfield";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from '../../../actions/UserActions';

function Login() {

  const Error = useSelector((state) => { return state.AuthReducer.error });
  console.log(Error);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [inpvalues, setInputvalues] = useState({
    email: "",
    password: ""
  });

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
    setInputvalues({ ...inpvalues, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(inpvalues, Navigate));
  }

  const handleSignIn = () => {
    Navigate('/signin')
  }
  console.log(inpvalues);
  return (


    <div>
      <Navbar />

      <div className="signInContainer">
        <div className="signInWrapper">

          <div className="signinbox">

            <div className="imgDiv">
              <img src={Person2} alt="" />
            </div>
            <div className="signInform">
              <form onSubmit={handleSubmit}>
              <div className="h1txt">
                <h1>USER LOGIN</h1>
              </div>

                {Error && (
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: 'red', margin: '5px' }}>{Error}</p>
                  </div>
                )}
                {inputs.map((input) => (
                  <Inputfield key={input.id} {...input} onChange={onChange} />

                ))}

                <div className="formBtn">
                  <button type="submit"> Login</button>
                </div>


              </form>
              <p>Already Have an Account?
                <span onClick={handleSignIn}>Sign Up</span>
              </p>

            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Login
