import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRestDetails } from '../../../../../../../actions/VendorActions';
import ImageComponent from './imageComponent/ImageComponent';
import "./Imagesettings.css"
import AddImage from './manageImage/addImage/AddImage';
import AllImages from './manageImage/allimage/AllImages';

function Imagesettings() {
  const SingleRest = useSelector((state) => { return state.SingleRestaurant.authData });
  console.log(SingleRest);
  const [vendor, setVendor] = useState(JSON.parse(localStorage.getItem('vendor'))?.email);
  const [menu, setMenu] = useState("all images");
  const Imagetabs = ["ALL IMAGES","ADD IMAGE"]
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestDetails(vendor))
  }, [menu])
  return (
    <div className="resMainconatainer">
      <div className="resMainwrapper">
        <div className="resMainmenu">
          <div className="menulist-items">
            <ImageComponent setMenu={setMenu} Imagetabs={Imagetabs}/>
              {menu === "all images" && <AllImages vendor={vendor}/>}
              {menu === "add image"  && <AddImage vendor={vendor}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Imagesettings
