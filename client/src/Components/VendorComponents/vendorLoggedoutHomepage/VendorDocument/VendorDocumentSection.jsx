import React from 'react'
import "./VendorDocumentSection.css";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VendorDocumentSection() {
    
  return (
    <div className="DocumentContainer">
        <h3>Documents Needed for Registration</h3>
        <div className="DocumentWrapper">
            <div className="DocumentDiv">
                <div className="DocumentHeaderText">
                    <h3>Get started with Online Booking</h3>
                    <p>Please keep the documents ready for a smooth signup</p>
                </div>
                <div className="DocumentList">
                    <div className="ListItem">
                        <div className="List">
            
                         <li>
                             <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                             FSSAI license copy</li>
                         <li>
                         <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                             Regular GSTIN <span>(if applicable)</span></li>
                         <li>
                         <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                             Your restaurant menu</li>
                        
                        </div>
                        <div className="List">
                        
                            <li>
                            <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                                PAN card copy</li>
                            <li>
                            <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                                Bank account details</li>
                            <li>
                            <span><FontAwesomeIcon icon ={faCircleCheck}/></span>
                                Dish images for top 5 items</li>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default VendorDocumentSection
