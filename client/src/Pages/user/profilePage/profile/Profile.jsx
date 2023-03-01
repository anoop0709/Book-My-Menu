import React, { useEffect, useState } from "react";
import "./Profile.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../../../../actions/UserActions";
function Profile({ user }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
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
  const [update, setUpdate] = useState(false);
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
  console.log(firstname,lastname,email,phonenumber);
  useEffect(() => {
    
  }, [firstname, lastname, email, phonenumber, address,user]);
 
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
                ADDRESS : <span >{user?.address?.map(add=>(
                    <>
                    {add.Housename},
                    {add.Streetname},
                    {add.City}, 
                    {add.Postcode}
                    </>
                ))}</span>
              </p>
            </div>
            <div className="btns">
              <button className="btnUser" onClick={()=>setShow(true)}>Add Address</button>
              {update && <button className="btnUser">Update</button>}
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
