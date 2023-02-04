import React, { useState } from 'react'
import Inputfield from '../../../../signupcomponent/inputComponent/Inputfield'
import validator from "validator"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { vendorSignup } from "../../../../../actions/VendorActions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import "./LicenceDetails.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Otp from "../../../../../Pages/otp/Otp"

function LicenceDetails({ data, setData, setPage, page }) {
    const [otpPage, setOtppage] = useState(false);
    const user = "vendor";
    const Error = useSelector((state) => { return state.VendorAuthReducer.error });
    const [err, setErr] = useState(false);
    const [showtoast, setShowtoast] = useState(false)
    const [submited, setSubmited] = useState(false);
    const { pancard, fssai, gst } = { ...data }
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const inputs = [
        {
            id: "16",
            type: "text",
            name: "pancard",
            placeholder: "Pancard Number",
            errMessage: "Pancard Number should be 10 characters and shouldn't be used any special charcters",
            required: "true",
            pattern: "^[A-Za-z0-9]{10,10}$",
            value: data.pancard

        },
        {
            id: "17",
            type: "text",
            name: "fssai",
            placeholder: "Fssai Number",
            errMessage: "Fssai Number should be 14 characters and shouldn't be used any special charcters",
            required: "true",
            pattern: "^[A-Za-z0-9]{14}$",
            value: data.fssai

        },
        {
            id: "18",
            type: "text",
            name: "gst",
            placeholder: "GST Number",
            errMessage: "GST Number should be 14 characters and shouldn't be used any special charcters",
            required: "true",
            pattern: "^[A-Za-z0-9]{14}$",
            value: data.gst

        },
    ]
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (inputs.map(input => input.errMessage)) {
            setErr(true)
            console.log("error");
        } else {
            setErr(false)
        }
    }
    const onSubmit = () => {
        if (validator.isEmpty(pancard) ||
            validator.isEmpty(fssai) ||
            validator.isEmpty(gst)
        ) {
            console.log("empty");
            return setErr(true)

        } else if (Error) {
            return setErr(true)

        } else {
            setErr(false)
            console.log(data);
            dispatch(vendorSignup(data, Navigate));
            setOtppage(true);
        }
    }
    const Prev = () => {
        setPage((currpage) => currpage - 1)
    }
    return (
        <>
        { showtoast && (
            <Row style={{ position: "absolute", top: "20px", right: "10px", width: "700px" }}>
                <Col xs={6} l={8}>
                    <Toast onClose={() => setShowtoast(false)} show={showtoast} delay={3000} autohide bg="success">
                        <Toast.Header>
                            <strong className="me-auto">Email Notification Send....</strong>
                        </Toast.Header>
                        <Toast.Body>Please check your Email!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        )}
            {submited && (

                <div className="successContainer">
                    <div className="successWrapper">
                        <div className="success">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                            <h1>Success</h1>
                        </div>
                        <p>Thank you for registering with us and we will verify your details and approve your account shortly</p>
                        <p>we will send you an email Notification once your account approved</p>
                        <button className="homebtn" onClick={() => { Navigate("/vendor") }}>Back to Home</button>
                    </div>

                </div>
            )}
            {otpPage ? (<Otp user={user} setShowtoast={setShowtoast} data={data} setSubmited={setSubmited} setOtppage={setOtppage}/>) :
             (
                <>
                    <div>
                        {Error && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ color: 'red', margin: '5px' }}>{Error}</p>
                            </div>
                        )}
                        {err && <p style={{ color: "red", marginBottom: "30px", textAlign: "center" }}>All fields must be filled with valid details</p>}
                    </div>
                    <div className="signinbox">
                        <div className="signInform">
                            {inputs.map((input) => (
                                <Inputfield key={input.id} {...input} onChange={onChange} />

                            ))}
                            <div className="formFooter">
                                <button disabled={page == 0} onClick={Prev}>Prev</button>
                                <button onClick={onSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
   
}

export default LicenceDetails
