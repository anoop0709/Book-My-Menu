import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faHeart, faLocationDot, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import "./AllRestaurants.css"
import Footer from '../Footer/Footer'
import Popular from '../PopularRestaurant/Popular'
import SortByCusine from './sortbycusine/SortByCusine'
import SortingComponent from './sortedrestaurantlist/SortingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { allrestaurant } from '../../../actions/AdminActions'
import { add_to_wishlist, delete_from_wishlist } from '../../../actions/UserActions'
import { useNavigate } from 'react-router'

function AllRestaurants() {
    const userId = JSON.parse(localStorage.getItem('profile'))?.userId;
    const userInfo = useSelector((state) => { return state.UserInfo.authData });
    const Navigate = useNavigate()
    const setColor = (id) => {
        if (userId) {

            dispatch(add_to_wishlist(userId, id,Navigate));
        } else {
            Navigate('/login')
        }
    }
    const resetColor = (restid) => {
        if (userId) {

            dispatch(delete_from_wishlist(userId, restid,Navigate))
        }
    }

    const singleView = (restId) => {
        Navigate('/singleview',{state:{restId:restId}})
    }

    const Restaurants = useSelector((state) => { return state.AllRestaurants.authData });
    console.log(Restaurants);
     const [filteredData,setFilteredData] = useState([]);
    const [location,setLocation] = useState("");
    const dispatch = useDispatch()
    const [cusine, setCusine] = useState("ALL RESTAURANTS")
    const Type = ["ALL RESTAURANTS", "AMERICAN", "ARABIC", "ITALIAN", "SOUTH INDIAN", "NORTH INDIAN", "CHINEESE", "THAI", "VEGETARIAN", "NON VEGETARIAN"]
    useEffect(() => {
        dispatch(allrestaurant());
    },[])
    console.log(location);
    const searchRest = ()=>{
       const filteredRest = Restaurants?.filter((rest)=>{
           console.log(rest);
           if(rest.location.toLowerCase() === location.toLowerCase() ){
               return rest;
           }
       })
       console.log(filteredRest);
       setFilteredData(filteredRest);
      
    }
    console.log(filteredData);
    return (
        <>
            <Navbar />
            <div className="inpcontainer">
                <FontAwesomeIcon icon={faLocationDot} className="faIcon Location" />
                <input type="text" placeholder="Trivandrum" className="inpBox" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                <FontAwesomeIcon icon={faSearch} className="faIcon "  onClick={searchRest}/>
            </div>
            <div className="allRestcontainer">
                <div className="sortwrapper">
                    <SortByCusine setCusine={setCusine} setLocation={setLocation} />
                </div>
                {filteredData.length ? (
                    <div className="allRestwrapper">

                    { filteredData?.map((rest) => (
                        <div className="restcard" key={rest?._id}>
                            <img src={rest?.images[0]} alt="" />
                            <div className="iconsForRest" key={rest?._id}>
                                {
                                    (userInfo?.wishlist.length === 0 || !userInfo?.wishlist.includes(rest?._id) ? (
                                        <FontAwesomeIcon icon={faHeart} className="icons" key={rest?._id} onClick={() => setColor(rest?._id)} />
                                    ) : (

                                        userInfo?.wishlist.map((id) => (

                                            id == rest?._id && (
                                                <FontAwesomeIcon icon={faHeart} className="iconfav" key={rest?._id} onClick={() => resetColor(rest?._id)} />

                                            )))
                                    ))}
                                <FontAwesomeIcon icon={faBars} className="icons"  onClick={()=>singleView(rest._id)} />
                            </div>
                            <div className="restText">
                                <h3>{rest?.restaurantname}</h3>
                                <h6>{rest?.location}</h6>
                                <span>
                                    <FontAwesomeIcon icon={faStar} className="Faicon" />
                                    <FontAwesomeIcon icon={faStar} className="Faicon" />
                                    <FontAwesomeIcon icon={faStar} className="Faicon" />
                                    <FontAwesomeIcon icon={faStar} className="Faicon" />
                                </span>
                            </div>
                        </div>

                    ))}

                </div>
                ):(
                 <>
                    {Type.map((type)=>(
                        type === cusine && <SortingComponent cusine={cusine} setLocation={setLocation}/>
                    ))}
                </>
                )}
            </div>
            <Popular />
            <Footer />
        </>
    )
}
export default AllRestaurants
