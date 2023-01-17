import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './Vendornavbar.css'

function Vendornavbar() {
    const vendor = JSON.parse(localStorage.getItem('vendor'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Location = useLocation();

    useEffect(() => {


    }, [Location]);

    function Register() {
        console.log("clicked signup");
        navigate('/vendorSignup')
    }


    function HomePage() {
        console.log(12345);
        navigate('/vendor')
    }
    const logout = ()=>{
        dispatch({type:"VENDORLOGOUT"})
        navigate('/vendor')
    }

    return (
        <div className="vendorNavContainer">
            <div className="vendorNavWrapper">
                <div className="vendorNavItems" >
                    <div className="logo" onClick={HomePage}>
                        <h1>Book My Menu</h1>
                        <span>For Business</span>
                    </div>
                    {vendor ? (
                        <div className="vendorNavBtns">
                            <button>{vendor.fullname}</button>
                            <button onClick={logout}>Log out</button>
                        </div>
                    ) : (
                        <div className="vendorNavBtns">
                            <button onClick={Register}>Register</button>
                            <button>Log In</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Vendornavbar
