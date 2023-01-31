import React, { useState } from 'react'
import Inputfield from '../../../../signupcomponent/inputComponent/Inputfield'
import validator from "validator";
import "./VendorPersonalInfo.css"

function VendorPersonalInfo({ data, setData,setPage,}) {
    const [err, setErr] = useState(false);
    const { firstname, lastname, email, phonenumber, password, confirmpassword } = { ...data }
    const inputs = [
        {
            id: "1",
            type: "text",
            name: "firstname",
            placeholder: "First Name",
            errMessage: "First name should be 3-16 characters and shouldn't be used any special charcters",
            required: "true",
            pattern: "^[A-Za-z0-9_]*{3,16}$",
            value: data.firstname

        },
        {
            id: "2",
            type: "text",
            name: "lastname",
            placeholder: "Last Name",
            errMessage: "Last name should be 3-16 characters and shouldn't be used any special characters",
            required: "true",
            pattern: "^[A-Za-z0-9_]*{3,16}$",
            value: data.lastname

        },
        {
            id: "3",
            type: "email",
            name: "email",
            placeholder: "Email",
            errMessage: "Should be a valid email",
            required: "true",
            pattern: "^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
            value: data.email

        },
        {
            id: "4",
            type: "number",
            name: "phonenumber",
            placeholder: "Phone Number",
            errMessage: "Should be 10 digits",
            required: "true",
            pattern: "^[0-9]{10,10}$",
            value: data.phonenumber,
        },
        {
            id: "5",
            type: "password",
            name: "password",
            placeholder: "Password",
            errMessage: "Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
            required: "true",
            pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$",
            value: data.password


        },
        {
            id: "6",
            type: "password",
            name: "confirmpassword",
            placeholder: "Confirm password",
            errMessage: "Confirm password not match",
            required: "true",
            pattern: data.password,
            value: data.confirmpassword

        }
    ]


    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
        if (inputs.map(input => input.errMessage)) {
            setErr(true)
            console.log("error");
        } else {
            setErr(false)
        }

    }
    const Next = () => {
        if (validator.isEmpty(firstname) ||
            validator.isEmpty(lastname) ||
            validator.isEmpty(email) ||
            validator.isEmpty(phonenumber) ||
            validator.isEmpty(password) ||
            validator.isEmpty(confirmpassword)) {
            console.log("empty");
            return setErr(true)

        } else {

            setPage(currpage => currpage + 1)
            setErr(false)
        }


    }



    return (
        <>
            <div>{err &&
             <p style={{ color: "red", marginBottom: "30px", textAlign: "center" }}>All fields must be filled with valid details</p>}
            </div>
            <div className="signinbox">

                <div className="signInform">
                    {inputs.map((input) => (
                        <Inputfield key={input.id} {...input} onChange={onChange} />

                    ))}
                    <div className="formFooter">
                        <button onClick={Next}>Next</button>
                    </div>
                </div>


            </div>

        </>

    )
}

export default VendorPersonalInfo
