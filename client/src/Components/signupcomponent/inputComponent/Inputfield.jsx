import { useState } from "react";
import "./inputfield.css"

function Inputfield(props) {
    const { label, id,errMessage, onChange, ...inputProps } = props;
    const [focused,setFocused] = useState(false);

    const handleFocus = (e)=>{
        setFocused(true);
    }
    
    return (
        <div>
            <div className="inputField">
                <label>{label}</label>
                <input 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                onFocus = {()=>{inputProps.name === "confirmpassword" && setFocused(true)}}
                focused = {focused.toString()}/>
                <span>{errMessage}</span>
            </div>
        </div>
    )
}

export default Inputfield
