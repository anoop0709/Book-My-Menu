import React,{useState,useNavigate} from 'react'
import "./CreateAdmin.css";
import {useDispatch} from "react-router-dom"
import {adminsignUp} from "../../actions/signup"

function CreateAdmin() {

    const [values,setValues] = useState({
        fullname: "",
        email:"",
        password:"",
        confirmpassword:""
    });
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    
    const inputs = [
        {
            id:"1",
            type:"text",
            name:"fullname",
            placeholder:"First Name",
            errMessage:"First name should be 3-16 characters and shouldn't be used any special charcters",
            label:"First Name",
            required:"true",
            pattern:"^[A-Za-z0-9]{3,16}$"
        },
        {
            id:"2",
            type:"email",
            name:"email",
            placeholder:"Email",
            errMessage:"Should be a valid email",
            label:"Email",
            required:"true",
            pattern:"^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    
        },
        {
            id:"3",
            type:"password",
            name:"password",
            placeholder:"Password",
            errMessage:"Password should be 8-20 characters and include atleast 1 uppercase,1 lowercase,1number and 1 special character",
            label:"Password",
            required:"true",
            pattern:"^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*[0-9]).*$"
    
        },
        {
            id:"4",
            type:"password",
            name:"confirmpassword",
            placeholder:"Confirm password",
            errMessage:"Confirm password not match",
            label:"Confirm Password",
            required:"true",
            pattern:values.password
        }
    ]
    
        const handleSubmit = (e)=>{
            e.preventDefault();
            console.log(values);
            dispatch(adminsignUp(values,Navigate))
        }
    
        const onChange = (e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }
       
    
        console.log(values);
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
                                    {inputs.map((input)=>(
                                        <Inputfield key={input.id} {...input}  onChange={onChange}/>
    
                                    ))}
                                   
                                    <div className="formBtn">
                                        <button type="submit"> Create Admin</button>
                                    </div>
                                    
                                </form>
                               
    
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        )
  
}

export default CreateAdmin
