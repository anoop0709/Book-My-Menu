import React, { useEffect, useRef, useState } from 'react'
import Inputfield from '../../../signupcomponent/inputComponent/Inputfield'
import validator from "validator"
import "./RestaurantInfo.css"
import {ProgressBar} from "react-bootstrap"
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import {sha256} from "crypto-hash"

function RestaurantInfo({ data, setData, page, setPage }) {

    const [err, setErr] = useState(false);
    const [image, setImage] = useState("");
    const [filename,setFilename] = useState([]);
    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
      };

     

    const { restaurantname, address, location, typeofcusine, seatingcapacity, openinghours, closinghours } = { ...data }

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
            value: data.restaurantname

        },
        {
            id: "8",
            type: "text",
            name: "address",
            placeholder: "Address",
            errMessage: "Address should be 3-16 characters and shouldn't be used any special charcters",
            label: "Address",
            required: true,
            pattern: "^[A-Za-z0-9_ ]*{3,16}$",
            value: data.address

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
            value: data.location

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
            value: data.typeofcusine

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
            value: data.seatingcapacity

        },
        {
            id: "12",
            type: "time",
            name: "openinghours",
            placeholder: "opening hours",
            errMessage: "Time required",
            label: "Opening Hours",
            required: true,
            value: data.openinghours

        },
        {
            id: "13",
            type: "time",
            name: "closinghours",
            placeholder: "closing hours",
            errMessage: "Time required",
            label: "Closing Hours",
            required: true,
            value: data.closinghours

        },
        // {
        //     id: "14",
        //     type: "file",
        //     name: "images",
        //     placeholder: "Upload Image",
        //     errMessage: "Please upload images",
        //     label: "Restaurant Images",
        //     required: true,
        //     value: formData.images,
        //     multiple:"multiple"
        // }
    ]
    const [uploadedImages, setUploadedimages] = useState([]);
    const [uploaded, setUploaded] = useState(null);
    useEffect(()=>{

    },[filename,uploadedImages])

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "aeqoy5zx")
        formData.append("cloud_name", "dbr213dju")
        console.log(image.name);      
        reset();
        axios.post("https://api.cloudinary.com/v1_1/dbr213dju/image/upload", formData, {

            onUploadProgress: (data) => {
                setUploaded(Math.round((data.loaded / data.total) * 100));
            }
        }).then((res) => res.data)
            .then((data) => {
                console.log(data);
                setUploadedimages((prevState) => [...prevState, data.url])
                setUploaded(null)
                setFilename((prevState)=> [...prevState,data])
            }).catch((err) => {
                console.log(err);
            })
    }
    const deleteImage = async (data)=>{
        const public_id = data.public_id;
        const url = data.url;
        const formData = new FormData();
        const timestamp = new Date().getTime()
        const string = `public_id=${public_id}&timestamp=${timestamp}Tkt6z54x3Wg8wS0dpnzre520JGY`
        const signature = await sha256(string)
        formData.append("public_id",public_id)
        formData.append("signature",signature)
        formData.append("api_key",574128436553534)
        formData.append("timestamp",timestamp)
        const res = await axios.post("https://api.cloudinary.com/v1_1/dbr213dju//image/destroy", formData);
        console.log(res);
        setFilename((prevState)=>prevState.filter((data)=> data.public_id !== public_id))
        setUploadedimages((prevState) =>prevState.filter((data)=>data.url !== url))

     
    }


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
        if (validator.isEmpty(restaurantname) ||
            validator.isEmpty(address) ||
            validator.isEmpty(location) ||
            validator.isEmpty(typeofcusine) ||
            validator.isEmpty(seatingcapacity) ||
            validator.isEmpty(openinghours) ||
            validator.isEmpty(closinghours)
        ) {
            console.log("empty");
            return setErr(true)

        } else {
            setErr(false)
            setData({ ...data, images: uploadedImages })
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

                    {
                        uploaded && (
                            <div className="progress mt-2">
                                <ProgressBar
                                    animated
                                    aria-valuenow={uploaded}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    role="progressbar"
                                    className="progress-bar"
                                    style={{ width: `${uploaded}%` }}
                                    label=  {`${uploaded}%`}                                 
                                />
                               
                            </div>
                        )


                    }

                    {
                       filename.map((data)=>(
                           <div className="imageName" key={data.public_id}>
                               <p>{data.original_filename}</p>
                               <FontAwesomeIcon className="dele" icon={faDeleteLeft} onClick={()=>deleteImage(data)}/>

                           </div>

                       ))
                    }
                    <div className="imageupload">
                        <label>Restaurant Images</label>
                        <input type="file" name="images" ref={ref} placeholder="upload images" required onChange={(e) => setImage(e.target.files[0])} />
                        <button className="uploadImage" onClick={uploadImage}>Upload</button>

                    </div>


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
