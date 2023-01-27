import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStarter, editStarter  , deleDish } from '../../../../../../../../actions/VendorActions';
import "./Starter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Starter() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(null);
  const [editData, setEditdata] = useState(false)
  const [deleData,setDeledata] = useState(false)
  const menuList = useSelector((state) => { return state.Restmenu.authData });
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('vendor')).email);
  const [item, setItem] = useState("")
  const [itemName, setItemname] = useState(item.itemName);
  const [itemDescription, setItemdescription] = useState(item.itemDescription);
  const [itemPrice, setItemprice] = useState(item.itemPrice);
  const [data, setData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: ""
  })
  const [editedData, setEditeddata] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: ""
  });



  useEffect(() => {
  }, [data,show,menuList])

  const handleClose = () => setShow(false);
  const deleteDish = (idx)=>{
    const Item = menuList?.starter?.filter((item, index) => {
      if (index === idx) return item;
    })
    setIndex(idx);
    setShow(true);
    setDeledata(true);
    setItem(Item);
  }
  const editDish = (idx) => {
    const Item = menuList?.starter?.filter((item, index) => {
      if (index === idx) return item;
    })
    setItem(Item)
    setIndex(idx);
    setEditdata(true);
    setShow(true);
    setItemname(Item[0].itemName);
    setItemdescription(Item[0].itemDescription);
    setItemprice(Item[0].itemPrice);
  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleChangename = (e) => {
    setItemname(e.target.value)
  }
  const handleChangedescription = (e) => {
    setItemdescription(e.target.value)
  }
  const handleChangeprice = (e) => {
    setItemprice(e.target.value)
  }

  const AddStarter = () => {
    console.log(data);
    dispatch(addStarter(data, email));
    setData({ itemName: "", itemDescription: "", itemPrice: "" })
  }
  const handleSaveChanges = () => {
    console.log(editedData);
    const data = {itemName,itemDescription, itemPrice}
    console.log(itemName, itemDescription, itemPrice);
    dispatch(editStarter({data,index,email}));
    setEditeddata({ itemName: "", itemDescription: "", itemPrice: "" });
    setShow(false)
  }
  const delItem = ()=>{
    dispatch(deleDish({index,email,item}))
    setShow(false)
  }
  return (
    <>
    {
      deleData && (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Delete ${item[0].itemName} ?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={delItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }
      { editData && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT DISH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalInp">
              <div className="inp">
                <label htmlFor="">Item Name:</label>
                <input type="text" name="itemName" placeholder={item[0]?.itemName}  onChange={handleChangename} />
              </div>
              <div className="inp">
                <label htmlFor="">Item Description:</label>
                <input type="text" name="itemDescription" placeholder={item[0]?.itemDescription} onChange={handleChangedescription} />
              </div>
              <div className="inp">
                <label htmlFor="">Item Price:</label>
                <input type="number" name="itemPrice" placeholder={item[0]?.itemPrice}  onChange={handleChangeprice} />
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
        </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
        </Button>
          </Modal.Footer>
        </Modal>
      )

      }

      <div className="StarterContainer">
        <div className="StarterWrapper">
          <div className="Starter">
            <input name="itemName" type="text" placeholder="Dish name" onChange={onChange} value={data.itemName} />
            <input name="itemDescription" type="text" placeholder="Description" onChange={onChange} value={data.itemDescription} />
            <input name="itemPrice" type="number" placeholder="price" onChange={onChange} value={data.itemPrice} />
            <button onClick={AddStarter} className="sbtBtn">ADD STARTER</button>
          </div>
        </div>


        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Starter Dish Name</th>
              <th scope="col">Dish Description</th>
              <th scope="col"> Item Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              menuList?.starter?.map((item, index) => (
                <tr key={index}>
                  <td >{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemDescription}</td>
                  <td>{item.itemPrice}</td>
                  <td ><FontAwesomeIcon icon={faEdit} onClick={() => { editDish(index) }} /></td>
                  <td ><FontAwesomeIcon icon={faTrash} onClick={() => { deleteDish(index) }} /></td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Starter
