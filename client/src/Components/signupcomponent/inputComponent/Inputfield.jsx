import "./inputfield.css"

function Inputfield(props) {
    const { label, id,errMessage, onChange, ...inputProps } = props;
    return (
        <div>
            <div className="inputField">
                <label>{label}</label>
                <input {...inputProps} onChange={onChange} />
                <span>{errMessage}</span>
            </div>
        </div>
    )
}

export default Inputfield
