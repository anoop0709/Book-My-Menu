import React from 'react'
import Inputfield from '../../../signupcomponent/inputComponent/Inputfield'

function VendorPersonalInfo({formData, setFormData,setErr}) {
   
    
    const inputs = [
        {
            id: "1",
            type: "text",
            name: "firstname",
            placeholder: "First Name",
            errMessage: "First name should be 3-16 characters and shouldn't be used any special charcters",
            label: "First Name",
            required: "true",
            pattern: "^[A-Za-z0-9]{3,16}$",
            value:formData.firstname
            
        },
        {
            id: "2",
            type: "text",
            name: "lastname",
            placeholder: "Last Name",
            errMessage: "Last name should be 3-16 characters and shouldn't be used any special characters",
            label: "Last Name",
            required: "true",
            pattern: "^[A-Za-z0-9]{3,16}$",
            value:formData.lastname
          
        },
        {
            id: "3",
            type: "email",
            name: "email",
            placeholder: "Email",
            errMessage: "Should be a valid email",
            label: "Email",
            required: "true",
            pattern: "^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
            value:formData.email

        },
        {
            id: "4",
            type: "number",
            name: "phonenumber",
            placeholder: "Phone Number",
            errMessage: "Should be 10 digits",
            label: "Phone Number",
            required: "true",
            pattern: "^[0-9]{10,10}$",
            value:formData.phonenumber,
        },
        {
            id: "5",
            type: "password",
            name: "password",
            placeholder: "Password",
            errMessage: "Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
            label: "Password",
            required: "true",
            pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$",
            value:formData.password
     

        },
        {
            id: "6",
            type: "password",
            name: "confirmpassword",
            placeholder: "Confirm password",
            errMessage: "Confirm password not match",
            label: "Confirm Password",
            required: "true",
            pattern: formData.password,
            value:formData.confirmpassword
  
        }
    ]
   

    const onChange = (e) => {
        
            setFormData({ ...formData, [e.target.name]: e.target.value })
            inputs.map((input=>{
                input.errMessage && setErr(true)
            }))
        }
        
    

    return (
  
     
        <div className="signinbox">
        <div className="signInform">
            {inputs.map((input) => (
                <Inputfield key={input.id} {...input} onChange={onChange} />

            ))}
            </div>
        </div>
      
      
    
    )
}

export default VendorPersonalInfo
