import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./ApproveVendors.css"
import {allrestaurant, verifyVendor} from "../../../actions/AdminActions"

function ApproveVendors() {
    const newVendors = useSelector((state) => { return state.NewVendors.authData })
    const Restaurants = useSelector((state) => { return state.AllRestaurants.authData })
    const dispatch = useDispatch();
    console.log(newVendors.length);

    useEffect(()=>{
        dispatch(allrestaurant())
    },[])

    return (
        <div className="vendorcontainer">
            <div className="vendorwrapper">
                {  newVendors.length != 0 ? (
                
                    newVendors.map((newVendor) => (

                        <div className="vendorRow" key={newVendor._id}>
                            <div className="Details">
                                <div className="cardHeading">
                                    <h5>Personal Details</h5>
                                </div>
                                <div className="cardBody">
                                    <table>
                                        <tr>
                                            <td>First Name :</td>
                                            <td>{newVendor.firstname}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Name :</td>
                                            <td>{newVendor.lastname}</td>
                                        </tr>
                                        <tr>
                                            <td>Email :</td>
                                            <td>{newVendor.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number :</td>
                                            <td>{newVendor.phonenumber}</td>
                                        </tr>
                                       
                                    </table>
                                </div>
                            </div>
                            {
                                Restaurants.map((rest)=>(
                                    rest.vendorId == newVendor._id && (

                               
                                <>
                                    <div className="Details" >
                                        <div className="cardHeading">
                                            <h5>Restaurant Details</h5>
                                        </div>
                                        <div className="cardBody">
                                            <table>
                                                <tr>
                                                    <td>Restaurant Name :</td>
                                                    <td>{rest.restaurantname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Restaurant Address :</td>
                                                    <td>{rest.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Location :</td>
                                                    <td>{rest.location}</td>
                                                </tr>
                                                <tr>
                                                    <td>Type of Cusine :</td>
                                                    <td>{rest.typeofcusine}</td>
                                                </tr>
                                                <tr>
                                                    <td>Seating Capacity :</td>
                                                    <td>{rest.seatingcapacity}</td>
                                                </tr>
                                                <tr>
                                                    <td>Opening Hours :</td>
                                                    <td>{rest.openinghours}</td>
                                                </tr>
                                                <tr>
                                                    <td>Closing Hours :</td>
                                                    <td>{rest.closinghours}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="Details">
                                        <div className="cardHeading">
                                            <h5>Restaurant Licence Details</h5>
                                        </div>
                                        <div className="cardBody">
                                            <table>
                                                <tr>
                                                    <td>PanCard Number :</td>
                                                    <td>{rest.pancard}</td>
                                                </tr>
                                                <tr>
                                                    <td>FSSAI Number :</td>
                                                    <td>{rest.fssai}</td>
                                                </tr>
                                                <tr>
                                                    <td>GST Number :</td>
                                                    <td>{rest.gst}</td>
                                                </tr>
                                               
                                            </table>
                                        </div>
                                    </div>
                                </>
                                 ) ))}
                            <div className="approveBtn">
                                <button className="btnApproval" onClick={()=>{dispatch(verifyVendor(newVendor._id))}}> Approve Vendor</button>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="vendorText">
                        <h6>No documents to Show .......</h6>

                    </div>
                
                )
            }
            </div>

        </div>

    )
}

export default ApproveVendors
