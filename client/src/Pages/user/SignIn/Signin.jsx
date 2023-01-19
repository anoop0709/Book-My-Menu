import "./Signin.css"
import Navbar from '../../../Components/homepageComponents/Navbar/Navbar';
import Person2 from '../../../images/person2.jpeg'
import React, { useState } from "react";
import Inputfield from "../../../Components/signupcomponent/inputComponent/Inputfield";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../../actions/UserActions";



function Signin() {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: ""
    });
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const inputs = [
        {
            id: "1",
            type: "text",
            name: "firstname",
            placeholder: "First Name",
            errMessage: "First name should be 3-16 characters and shouldn't be used any special charcters",
            label: "First Name",
            required: "true",
            pattern: "^[A-Za-z0-9]{3,16}$"
        },
        {
            id: "2",
            type: "text",
            name: "lastname",
            placeholder: "Last Name",
            errMessage: "Last name should be 3-16 characters and shouldn't be used any special characters",
            label: "Last Name",
            required: "true",
            pattern: "^[A-Za-z0-9]{3,16}$"
        },
        {
            id: "3",
            type: "email",
            name: "email",
            placeholder: "Email",
            errMessage: "Should be a valid email",
            label: "Email",
            required: "true",
            pattern: "^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

        },
        {
            id: "4",
            type: "number",
            name: "phonenumber",
            placeholder: "Phone Number",
            errMessage: "Should be 10 digits",
            label: "Phone Number",
            required: "true",
            pattern: "^[0-9]{10,10}$"
        },
        {
            id: "5",
            type: "password",
            name: "password",
            placeholder: "Password",
            errMessage: "Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
            label: "Password",
            required: "true",
            pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$"

        },
        {
            id: "6",
            type: "password",
            name: "confirmpassword",
            placeholder: "Confirm password",
            errMessage: "Confirm password not match",
            label: "Confirm Password",
            required: "true",
            pattern: values.password
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch(signUp(values, Navigate))
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleLogIn = () => {
        Navigate('/login')
    }

    console.log(values);
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
                                    <h1>USER SIGNUP</h1>
                                </div>

                                {inputs.map((input) => (
                                    <Inputfield key={input.id} {...input} onChange={onChange} />

                                ))}

                                <div className="formBtn">
                                    <button type="submit"> Register</button>
                                </div>

                            </form>
                            <p>Already Have an Account?
                                    <span onClick={handleLogIn}>Login</span>
                            </p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signin
