import React from 'react'
import Inputfield from '../../../signupcomponent/inputComponent/Inputfield'

function LicenceDetails({formData,setFormData}) {
    const inputs = [
        {
            id: "14",
            type: "text",
            name: "pancard",
            placeholder: "Pancard Number",
            errMessage: "Pancard Number should be 10 characters and shouldn't be used any special charcters",
            label: "Pancard Number",
            required: "true",
            pattern: "^[A-Za-z0-9]{10,10}$",
            value:formData.pancard
            
        },
        {
            id: "15",
            type: "text",
            name: "fssai",
            placeholder: "Fssai Number",
            errMessage: "Fssai Number should be 14 characters and shouldn't be used any special charcters",
            label: "Fssai Number",
            required: "true",
            pattern: "^[A-Za-z0-9]{14}$",
            value:formData.fssai
            
        },
        {
            id: "16",
            type: "text",
            name: "gst",
            placeholder: "GST Number",
            errMessage: "GST Number should be 14 characters and shouldn't be used any special charcters",
            label: "GST Number",
            required: "true",
            pattern: "^[A-Za-z0-9]{14}$",
            value:formData.gst
            
        },
    ]

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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

export default LicenceDetails
