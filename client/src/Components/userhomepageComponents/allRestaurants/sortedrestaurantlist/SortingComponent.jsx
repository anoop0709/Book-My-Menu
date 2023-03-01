import React, { useEffect, useState } from 'react'
import "./SortingComponent.css"
import { useDispatch, useSelector } from 'react-redux';
import { add_to_wishlist, delete_from_wishlist } from '../../../../actions/UserActions'
import { faBars, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { allrestaurant } from '../../../../actions/AdminActions';
import { useNavigate } from 'react-router';

function SortingComponent({ cusine, setFilteredData }) {
    const [restTypeofCusine, setResttypeofCusine] = useState([]);
    const Restaurants = useSelector((state) => { return state.AllRestaurants.authData });
    const userId = JSON.parse(localStorage.getItem('profile'))?.userId;
    const userInfo = useSelector((state) => { return state.UserInfo.authData });
    const Navigate = useNavigate()
    const dispatch = useDispatch();
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
    useEffect(() => {
        const restList = Restaurants.filter((restaurant) => {
            if (restaurant.typeofcusine === cusine) {
                return restaurant
            }
        })
        setResttypeofCusine(restList)
        setFilteredData("");
    }, [cusine])


    

    return (
        <>
            {cusine === "ALL RESTAURANTS" ? (

                <div className="allRestwrapper">
                    {Restaurants?.map((rest) => (
                        <div className="restcard" key={rest._id}>
                            <img src={rest?.images[0]} alt="" />
                            <div className="iconsForRest" key={rest._id}>
                                {
                                    (userInfo?.wishlist.length === 0 || !userInfo?.wishlist.includes(rest._id) ? (
                                        <FontAwesomeIcon icon={faHeart} className="icons" key={rest._id} onClick={() => setColor(rest._id)} />
                                    ) : (

                                        userInfo?.wishlist.map((id) => (

                                            id == rest._id && (
                                                <FontAwesomeIcon icon={faHeart} className="iconfav" key={rest._id} onClick={() => resetColor(rest._id)} />

                                            )))
                                    ))}

                                <FontAwesomeIcon icon={faBars} className="icons" onClick={()=>singleView(rest._id)}/>
                            </div>
                            <div className="restText">
                                <h3>{rest.restaurantname}</h3>
                                <h6>{rest.location}</h6>
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
            ) : (
                <>
                    {restTypeofCusine && (
                        <div className="allRestwrapper">

                            { restTypeofCusine?.map((rest) => (
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
                                        <FontAwesomeIcon icon={faBars} className="icons"  onClick={()=>singleView(rest._id)}/>
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
                    )}
                </>
            )}
        </>
    )
}

export default SortingComponent
