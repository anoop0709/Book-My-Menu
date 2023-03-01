import React, { useEffect, useRef, useState } from 'react'
import { ProgressBar } from "react-bootstrap"
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { sha256 } from "crypto-hash"
import "../../../../../../../VendorsignupForm/VendorMainForm/RestaurantInfo/RestaurantInfo.css"
import "./AddImage.css"
import { useDispatch } from 'react-redux'
import { addImage } from '../../../../../../../../../actions/VendorActions'

function AddImage({vendor}) {
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState([]);
    const [uploadedImages, setUploadedimages] = useState([]);
    const [uploaded, setUploaded] = useState(null);
    const dispatch = useDispatch();
    const ref = useRef();
    const imageRef = useRef();
    const reset = () => {
        ref.current.value = "";
    };
    const rerender = () =>{
        imageRef.current = uploadedImages;
        console.log(imageRef);
    }
   
    

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
                setFilename((prevState) => [...prevState, data])
            }).catch((err) => {
                console.log(err);
            })
    }
    const saveImage = ()=>{
        dispatch(addImage({email:vendor,images:uploadedImages}));
        setUploadedimages([])
        setFilename([])
        rerender();

    }
    const deleteImage = async (data) => {
       
        const public_id = data.public_id;
        const url = data.url;
       
        const formData = new FormData();
        const timestamp = new Date().getTime()
        const string = `public_id=${public_id}&timestamp=${timestamp}Tkt6z54x3Wg8wS0dpnzre520JGY`
        const signature = await sha256(string)
        formData.append("public_id", public_id)
        formData.append("signature", signature)
        formData.append("api_key", 574128436553534)
        formData.append("timestamp", timestamp)
        const res = await axios.post("https://api.cloudinary.com/v1_1/dbr213dju//image/destroy", formData);
        console.log(res);
        setUploadedimages((prevState) => prevState.filter((data) => data !== url))
        rerender();
        setFilename((prevState) => prevState.filter((data) => data.public_id !== public_id))
        
    }
    useEffect(() => {
      imageRef.current=uploadedImages

    }, [uploadedImages, imageRef])

    return (
        <>
            <div className="restImagecontainer">
                <div className="restImagewrapper">
                    <div className="imageupload">
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
                                        label={`${uploaded}%`}
                                    />

                                </div>
                            )
                        }

                        {
                            filename.map((data) => (
                                <div className="imageName" key={data.public_id}>
                                    <p>{data.original_filename}</p>
                                    <FontAwesomeIcon className="dele" icon={faTrash} onClick={() => deleteImage(data)} />
                                </div>
                            ))
                        }
                        <div className="image">
                            <input type="file" name="images" ref={ref} placeholder="upload images" required onChange={(e) => setImage(e.target.files[0])} />
                            <button className="uploadImage" onClick={uploadImage}>Upload</button>
                        </div>
                        <div className="imagePreview" ref={imageRef}>
                            {uploadedImages.map((image,index)=>(
                                <img src={image} alt="" key={index} />
                            ))}
                        </div>
                        {uploadedImages.length > 0 &&
                        <div className="saveBtn">
                        <button className="uploadImage" onClick={saveImage}>Save</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddImage
