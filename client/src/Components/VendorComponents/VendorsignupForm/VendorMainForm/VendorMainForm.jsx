import React, { useState } from 'react'
import "./VendorMainForm.css";
import Vendornavbar from '../../VendorNavbar/Vendornavbar';
import LicenceDetails from '../LicenceDetails/LicenceDetails';
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import VendorPersonalInfo from '../VendorPersonalInfo/VendorPersonalInfo';
import validator from "validator";

function VendorMainForm() {
   
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: "",
        restaurantname: "",
        address: "",
        location: "",
        typeofcusine: "",
        seatingcapacity: "",
        openinghours: "",
        closinghours:"",
        images: [],
        pancard: "",
        fssai: "",
        gst: ""

    })


    
    const PageTitle = ["Personal Info", "Restaurant Details", "Licence Details"];

    const PageDisplay = () => {
        if (page == 0) {return <VendorPersonalInfo formData={formData} setFormData={setFormData} setPage={setPage}/>}
        else if (page == 1) {return <RestaurantInfo formData={formData} setFormData={setFormData} setPage={setPage} page={page}/>}
        else {return <LicenceDetails formData={formData} setFormData={setFormData} setPage={setPage} page={page}/>}


    };

    
    




    

    return (
        <>
            <Vendornavbar />
            <div className="Main-form-container">
                <div className="formWrapper">

                    <div className="ProgressBar">
                        <div className="bar" style={{ width: page == 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}></div>
                    </div>
                    <div className="formHeading">
                        <h1>{PageTitle[page]}</h1>
                    </div>
                    <div className="formBody">
                        {PageDisplay()}
                    </div>
                   

                </div>

            </div>
        </>
    )
}

export default VendorMainForm
