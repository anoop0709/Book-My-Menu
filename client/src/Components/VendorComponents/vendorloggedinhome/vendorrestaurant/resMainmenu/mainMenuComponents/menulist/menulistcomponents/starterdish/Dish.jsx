import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDish, editDish  , deleDish } from '../../../../../../../../../actions/VendorActions';
import "./Starter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Starter({collectionName,tabName}) {
  console.log(collectionName)
  
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [deleshow, setDeleshow] = useState(true);
  const [index, setIndex] = useState(null);
  const [editData, setEditdata] = useState(false)
  const [deleData,setDeledata] = useState(false)
  const menuList = useSelector((state) => { return state.Restmenu.authData });
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('vendor')).email);
  const [item, setItem] = useState("")
  const [itemName, setItemname] = useState("");
  const [itemDescription, setItemdescription] = useState("");
  const [itemPrice, setItemprice] = useState("");
  const [data, setData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: ""
  })
  const [editedData, setEditeddata] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice:""
  });



  useEffect(() => {
  }, [data,show,menuList])

  const handleClose = () =>{
    setEditeddata({ itemName: "", itemDescription: "", itemPrice: "" });
    setItemname("");
    setItemdescription("");
    setItemprice("")
    setItem("")
    setDeleshow(false)
  };
  const handleEditClose = ()=>{
    setEditeddata({ itemName: "", itemDescription: "", itemPrice: "" });
    setItemname("");
    setItemdescription("");
    setItemprice("")
    setItem("")
    setShow(false)
  }
  const deleteDish = (idx)=>{
    const Item = menuList?.[`${collectionName}`]?.filter((item, index) => {
      if (index === idx) return item;
    })
    setIndex(idx);
    setDeleshow(true);
    setDeledata(true);
    setItem(Item);
  }
  const editdish = (idx) => {
    const Item = menuList?.[`${collectionName}`]?.filter((item, index) => {
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
    dispatch(addDish({data,email,collectionName}));
    setData({ itemName: "", itemDescription: "", itemPrice: "" })
  }
  const handleSaveChanges = () => {
    console.log(editedData);
    const data = {itemName,itemDescription, itemPrice}
    console.log(itemName, itemDescription, itemPrice);
    dispatch(editDish({data,index,email,collectionName}));
    setEditeddata({ itemName: "", itemDescription: "", itemPrice: "" });
    setItemname("");
    setItemdescription("");
    setItemprice("")
    setItem("")
    setShow(false)
  }
  const delItem = ()=>{
    dispatch(deleDish({index,email,item,collectionName}))
    setItem("")
    setItemname("");
    setItemdescription("");
    setItemprice("")
    setItem("")
    setShow(false)
  }
  return (
    <>
    {
      deleData && (
        <Modal show={deleshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Delete ${item[0]?.itemName} ?`}</Modal.Body>
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
        <Modal show={show} onHide={handleEditClose}>
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
            <Button variant="secondary" onClick={handleEditClose}>
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
            <button onClick={AddStarter} className="sbtBtn">{`Add ${collectionName}`}</button>
          </div>
        </div>


        <table>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Starter Dish Name</th>
              <th scope="col">Dish Description</th>
              <th scope="col"> Item Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              menuList?.[`${collectionName}`]?.map((item, index) => (
                <tr key={index}>
                  <td >{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemDescription}</td>
                  <td>{item.itemPrice}</td>
                  <td ><FontAwesomeIcon icon={faEdit} onClick={() => { editdish(index) }} key={index}/></td>
                  <td ><FontAwesomeIcon icon={faTrash} onClick={() => { deleteDish(index)}} key={index}/></td>

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
