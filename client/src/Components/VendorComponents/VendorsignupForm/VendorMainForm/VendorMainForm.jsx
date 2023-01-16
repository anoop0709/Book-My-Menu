import React, { useState } from 'react'
import "./VendorMainForm.css";
import Vendornavbar from '../../VendorNavbar/Vendornavbar';
import LicenceDetails from '../LicenceDetails/LicenceDetails';
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import VendorPersonalInfo from '../VendorPersonalInfo/VendorPersonalInfo';

function VendorMainForm() {
    const [err,setErr] = useState(false)
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
        images: [],
        pancard: "",
        licencenumber: "",
        fssai: "",
        gst: ""

    })
    const PageTitle = ["Personal Info", "Restaurant Details", "Licence Details"];

    const PageDisplay = () => {
        if (page == 0) return <VendorPersonalInfo formData={formData} setFormData={setFormData} setErr={setErr} />
        else if (page == 1) return <RestaurantInfo formData={formData} setFormData={setFormData}  />
        else return <LicenceDetails formData={formData} setFormData={setFormData} />


    };


    const Prev = () => {
      
        setPage((currpage) => currpage = currpage - 1)

    }
    const Next = () => {
      const {firstname,
      lastname,
      email,
      phonenumber,
      password,
      confirmpassword,
      restaurantname,
      address,
      location,
      typeofcusine,
      seatingcapacity,
      openinghours,
      images,
      pancard,
      licencenumber,
      fssai,
      gst} = {...formData}
      console.log(firstname=="");
      if((page == 0) && (firstname || lastname || email || phonenumber || password || confirmpassword)  == ""){
        setPage((currpage) => currpage = currpage)
      }else if(err){
        setPage((currpage) => currpage = currpage)
    }else{
        setPage((currpage) => currpage = currpage + 1)
      }
        

    }
    const submitForm = ()=>{

    }

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
                    <div className="formFooter">
                        <button disabled={page == 0} onClick={Prev}>Prev</button>
                        {page == PageTitle.length - 1 ? (
                            <button onClick={submitForm}>Submit</button>
                           
                        ) : (
                            <button onClick={Next}>Next</button>
                        )
                        }

                    </div>


                </div>

            </div>
        </>
    )
}

export default VendorMainForm
