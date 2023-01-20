import React, { useState } from 'react'
import Inputfield from '../../../signupcomponent/inputComponent/Inputfield'
import validator from "validator"

function RestaurantInfo({ formData, setFormData,page,setPage }) {

    const [err, setErr] = useState(false);
    const { restaurantname, address, location, typeofcusine, seatingcapacity, openinghours,closinghours, images } = { ...formData }

    const inputs = [
        {
            id: "7",
            type: "text",
            name: "restaurantname",
            placeholder: "Restaurant Name",
            errMessage: "Restaurant name should be 3-16 characters and shouldn't be used any special charcters",
            label: "Restaurant Name",
            required: true,
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value: formData.restaurantname

        },
        {
            id: "8",
            type: "text",
            name: "address",
            placeholder: "Address",
            errMessage: "Address should be 3-16 characters and shouldn't be used any special charcters",
            label: "Address Name",
            required: true,
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value: formData.address

        },
        {
            id: "9",
            type: "text",
            name: "location",
            placeholder: "Location",
            errMessage: "Location should be 3-16 characters and shouldn't be used any special charcters",
            label: "Location",
            required: true,
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value: formData.location

        },
        {
            id: "10",
            type: "text",
            name: "typeofcusine",
            placeholder: "Type of cusine",
            errMessage: "Type of cusine should be 3-16 characters and shouldn't be used any special charcters",
            label: "Type of cusine",
            required: true,
            pattern: "^[a-zA-Z0-9_ ]*{3,16}$",
            value: formData.typeofcusine

        },
        {
            id: "11",
            type: "number",
            name: "seatingcapacity",
            placeholder: "Seating capacity",
            errMessage: "minimum 1 number required",
            label: "Seating capacity",
            required: true,
            pattern: "^[0-9]{1}$",
            value: formData.seatingcapacity

        },
        {
            id: "12",
            type: "time",
            name: "openinghours",
            placeholder: "opening hours",
            errMessage: "Time required",
            label: "Opening Hours",
            required: true,
            value: formData.openinghours

        },
        {
            id: "13",
            type: "time",
            name: "closinghours",
            placeholder: "closing hours",
            errMessage: "Time required",
            label: "Closing Hours",
            required: true,
            value: formData.closinghours

        },
        {
            id: "14",
            type: "file",
            name: "images",
            placeholder: "Upload Image",
            errMessage: "Please upload images",
            label: "Restaurant Images",
            required: true,
            value: formData.images,
            multiple:"multiple"
        }
    ]
    const onChange = (e) => {

       e.target.type === "file" ?  setFormData({ ...formData, [e.target.name]: e.target.files }) :
           setFormData({ ...formData, [e.target.name]: e.target.value })
       
        if (inputs.map(input => input.errMessage)) {
            setErr(true)
            console.log("error");
        } else {
            setErr(false)
        }
    }


    const Next = () => {
        if (validator.isEmpty(restaurantname) ||
            validator.isEmpty(address) ||
            validator.isEmpty(location) ||
            validator.isEmpty(typeofcusine) ||
            validator.isEmpty(seatingcapacity) ||
            validator.isEmpty(openinghours) ||
            validator.isEmpty(closinghours) ||
            validator.isEmpty(images)) {
            console.log("empty");
            return setErr(true)

        } else {
            setErr(false)
            setPage(currpage => currpage + 1)

        }


    }
    const Prev = () => {

        setPage((currpage) => currpage - 1)

    }
    return (
        <>
            <div>{err &&
                <p style={{ color: "red", marginBottom: "30px", textAlign: "center" }}>All fields must be filled with valid details</p>}
            </div>
            <div className="signinbox">
                <div className="signInform">
                    {inputs.map((input) => (
                      
                        <Inputfield key={input.id}  {...input} onChange={onChange} />

                    ))}

                    <div className="formFooter">
                    <button disabled={page == 0} onClick={Prev}>Prev</button>
                        <button onClick={Next}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantInfo
