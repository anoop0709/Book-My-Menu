import React, { useEffect, useState } from "react";
import "./Profile.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddress, dele_Address, get_user_info, update_Details } from "../../../../actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function Profile({user}) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  //const user = useSelector((state)=>{return state?.UserInfo.authData});
  console.log(user);
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber);
  const [show,setShow] = useState(false);
  const [address, setAddress] = useState({
    Housename:"",
    Streetname:"",
    City:"",
    Postcode:""
  });
  const userid = user?._id
  
  const [update, setUpdate] = useState(false);

  const updateDetails = ()=>{
    dispatch(update_Details({firstname,lastname,email,phonenumber,userid}))
    setUpdate(false)
  }
  const handleEditClose = ()=>{
    setShow(false)
  }
  const handleChange = (e)=>{
    setAddress({...address,[e.target.name]:e.target.value})
  }
  const handleSaveChanges = ()=>{
    console.log(address);
    dispatch(addAddress({address:address,userid:user?._id}))
    setShow(false)
  }
  const delAddress = (idx) =>{
    dispatch(dele_Address({idx:idx,userid:userid}))

  }
  console.log(firstname,lastname,email,phonenumber);


  useEffect(() => {
   console.log("profile render");
  },[user]);
 
  return (
    <div>
      <div className="profileDetails">
        <div className="profileDetailsWrap">
          <div className="userDetails">
            <h6>USER DETAILS</h6>
            <div className="user">
              <p>
                FIRST NAME :
                <span
                  contentEditable="true"
                  onInput={(e) => {setFirstname(e.target.textContent); setUpdate(true);}}
                >
                  {user?.firstname}
                </span>
              </p>
              <p>
                LAST NAME :
                <span
                  contentEditable="true"
                  onInput={(e) => {setLastname(e.target.textContent); setUpdate(true);}}
                >
                  {user?.lastname}
                </span>
              </p>
              <p>
                EMAIL :
                <span
                  contentEditable="true"
                  onInput={(e) => {setEmail(e.target.textContent); setUpdate(true);}}
                >
                  {user?.email}
                </span>
              </p>
              <p>
                PHONENUMBER :
                <span
                  contentEditable="true"
                  onInput={(e) => {setPhonenumber(e.target.textContent); setUpdate(true);}}
                >
                  {user?.phonenumber}
                </span>
              </p>
              <p>
                ADDRESS : <span >{user?.address?.map((add,index)=>(
                    <>
                    <div className="address" key={index}> 
                    <p><span>{add?.Housename}</span></p>
                    <p><span>{add?.Streetname}</span></p>
                    <p><span>{add?.City}</span></p>
                    <p><span>{add?.Postcode}</span></p> 
                        
                    </div>
                     <FontAwesomeIcon className="icontrash" icon={faTrash} onClick={()=>delAddress(index)}/> 
                     </>
                ))}</span>
              </p>
            </div>
            <div className="btns">
              <button className="btnUser" onClick={()=>setShow(true)}>Add Address</button>
              {update && <button className="btnUser" onClick={updateDetails}>Update</button>}
            </div>
            <p>Click the details to edit the content</p>
          </div>
        </div>
      </div>
      {show && (

          <Modal show={show} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD ADDRESS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalInp">
              <div className="inp">
                <label htmlFor="">House name:</label>
                <input type="text" name="Housename"  onChange={handleChange} />
              </div>
              <div className="inp">
                <label htmlFor="">Street name:</label>
                <input type="text" name="Streetname"  onChange={handleChange} />
              </div>
              <div className="inp">
                <label htmlFor="">City:</label>
                <input type="text" name="City"  onChange={handleChange} />
              </div>
              <div className="inp">
                <label htmlFor="">Postcode:</label>
                <input type="number" name="Postcode"  onChange={handleChange} />
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
        </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
        </Button>
          </Modal.Footer>
        </Modal>
          )}
    </div>
  );
}

export default Profile;
