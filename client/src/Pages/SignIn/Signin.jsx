import "./Signin.css"
import Navbar from '../../Components/homepageComponents/Navbar/Navbar';
import Footer from '../../Components/homepageComponents/Footer/Footer';
import Person1 from '../../images/person1.webp'
import { useState } from "react";


const intialData = {
    Firstname: "",
    Lastname:"",
    Email:"",
    Phonenumber:"",
    Password:"",
    Confirmpassword:""
}
function Signin() {
const [formData,setFormData] = useState(intialData);
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }
    return (
        <div>
            <Navbar />
            <div className="signInContainer">
                <div className="signInWrapper">
                    <div className="signinbox">

                        <div className="imgDiv">
                            <img src={Person1} alt="" />
                        </div>
                        <div className="signInform">
                            <form onSubmit={handleSubmit}>
                                <div className="inputField">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="Firstname" onChange={handleChange}/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="firstname">Last Name</label>
                                    <input type="text" name="Lastname" onChange={handleChange}/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="firstname">Email</label>
                                    <input type="email" name="Email" onChange={handleChange}/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="firstname">Phone Number</label>
                                    <input type="text" name="Phonenumber" onChange={handleChange}/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="firstname">Password</label>
                                    <input type="password" name="Password" onChange={handleChange} />
                                </div>
                                <div className="inputField">
                                    <label htmlFor="firstname">Confirm Password</label>
                                    <input type="password" name="Confirmpassword" onChange={handleChange} />
                                </div>
                                <div className="formBtn">
                                    <button type="submit"> Register</button>
                                </div>
                                
                            </form>
                            <p>Already Have an Account? 
                                    <span>Login</span>
                                </p>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Signin
