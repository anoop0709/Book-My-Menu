import React, { useState } from 'react'
import Inputfield from '../../../signupcomponent/inputComponent/Inputfield'

function RestaurantInfo({formData,setFormData}) {

   

    const inputs = [
        {
            id: "7",
            type: "text",
            name: "restaurantname",
            placeholder: "Restaurant Name",
            errMessage: "Restaurant name should be 3-16 characters and shouldn't be used any special charcters",
            label: "Restaurant Name",
            required: "true",
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value:formData.restaurantname
            
        },
        {
            id: "8",
            type: "text",
            name: "address",
            placeholder: "Address",
            errMessage: "Address should be 3-16 characters and shouldn't be used any special charcters",
            label: "Address Name",
            required: "true",
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value:formData.address
            
        },
        {
            id: "9",
            type: "text",
            name: "location",
            placeholder: "Location",
            errMessage: "Location should be 3-16 characters and shouldn't be used any special charcters",
            label: "Location",
            required: "true",
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value:formData.location
            
        },
        {
            id: "10",
            type: "text",
            name: "typeofcusine",
            placeholder: "Type of cusine",
            errMessage: "Type of cusine should be 3-16 characters and shouldn't be used any special charcters",
            label: "Type of cusine",
            required: "true",
            pattern: "^[a-zA-Z0-9_ ]*{3,16}$",
            value:formData.typeofcusine
            
        },
        {
            id: "11",
            type: "number",
            name: "seatingcapacity",
            placeholder: "Seating capacity",
            errMessage: "minimum 1 number required",
            label: "Seating capacity",
            required: "true",
            pattern: "^[0-9]{1}$",
            value:formData.seatingcapacity
            
        },
        {
            id: "12",
            type: "time",
            name: "openinghours",
            placeholder: "opening hours",
            errMessage: "Time required",
            label: "Opening Hours",
            required: "true",
            value:formData.openinghours
            
        },
        {
            id: "13",
            type: "file",
            name: "image",
            placeholder: "Upload Image",
            errMessage: "Please upload images",
            label: "Restaurant Images",
            required: "true",
            value:formData.images,
            multiple:"true"
        }
    ]
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
       }
  return (
    <div className="signinbox">
    <div className="signInform">
        {inputs.map((input) => (
            <Inputfield key={input.id} {...input} onChange={onChange}  />
            
        ))}   
        </div>
    </div>
  )
}

export default RestaurantInfo
