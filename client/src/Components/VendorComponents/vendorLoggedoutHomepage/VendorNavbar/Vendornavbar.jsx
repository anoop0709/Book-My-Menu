import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Vendornavbar.css'

function Vendornavbar() {
    const navigate = useNavigate();
    const Location = useLocation();

    useEffect(() => {


    }, [Location]);


    const Vendorlogin = ()=>{
        navigate('/vendorLogin')
    }
    function Register() {
        navigate('/vendorSignup')
    }


    function HomePage() {
        navigate('/vendor')
    }

    return (
        <div className="vendorNavcontainer">
            <div className="vendorNavWrapper">
                <div className="vendorNavItems" >
                    <div className="Logo" onClick={HomePage}>
                        <h1>Book My Menu</h1>
                        <span>For Business</span>
                    </div>
                        <div className="vendorNavBtns">
                            <button onClick={Register}>Register</button>
                            <button onClick={Vendorlogin}>Log In</button>
                        </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Vendornavbar
