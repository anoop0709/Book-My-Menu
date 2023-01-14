import React from 'react'
import "./VendorDocumentSection.css";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VendorDocumentSection() {
    
  return (
    <div className="DocumentContainer">
        <div className="DocumentWrapper">
            <div className="DocumentDiv">
                <div className="DocumentHeaderText">
                    <h1>Get started with Online Booking</h1>
                    <h4>Please keep the documents ready for a smooth signup</h4>
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
