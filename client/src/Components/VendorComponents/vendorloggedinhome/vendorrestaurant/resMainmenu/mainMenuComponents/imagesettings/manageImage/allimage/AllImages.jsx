import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./AllImages.css";
import axios from "axios"
import {sha256} from "crypto-hash"
import { useDispatch, useSelector } from 'react-redux';
import { deleteRestImage } from '../../../../../../../../../actions/VendorActions';

function AllImages({vendor}) {
    const dispatch = useDispatch();
    const SingleRest = useSelector((state) => { return state.SingleRestaurant.authData });

    const deleteImage = async (image,index)=>{
            
            const public_id = image.substring(image.lastIndexOf('/')+1);
            const formData = new FormData();
            const timestamp = new Date().getTime()
            const string = `public_id=${public_id}&timestamp=${timestamp}Tkt6z54x3Wg8wS0dpnzre520JGY`
            const signature = await sha256(string)
            formData.append("public_id",public_id)
            formData.append("signature",signature)
            formData.append("api_key",574128436553534)
            formData.append("timestamp",timestamp)
            await axios.post("https://api.cloudinary.com/v1_1/dbr213dju//image/destroy", formData);
            dispatch(deleteRestImage(vendor,image,index)) 
    }
  return (
    <div className="restImagecontainer">
        <div className="restImagewrapper">
        {SingleRest?.images?.map((image,index)=>(
            <div className="iamgecontainer">
                <img src={image} alt="" key={index}/>
               
                <FontAwesomeIcon className = "Deleicon" icon={faTrash} onClick={()=>{deleteImage(image,index)}}/>
            </div>
        ))}
    
        </div>
    </div>
  )
}

export default AllImages
