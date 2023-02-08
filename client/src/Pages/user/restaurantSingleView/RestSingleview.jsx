import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { allrestaurant } from '../../../actions/AdminActions';
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar"
import "./RestSingleview.css"
import Reviews from "../../../Components/userhomepageComponents/reviews/Reviews"
import Footer from '../../../Components/userhomepageComponents/Footer/Footer';

function RestSingleview() {
    const Restaurants = useSelector((state) => { return state.AllRestaurants.authData })
    const Location = useLocation();
    const [restaurant, setRestaurant] = useState({})
    const [mainImage, setMainimage] = useState();
    const Navigate = useNavigate();
    const { restId } = Location.state;
    const dispatch = useDispatch();

    const viewImage = (idx) => {
        setMainimage(restaurant[0]?.images[idx])
    }
    useEffect(() => {
        const singleRest = Restaurants?.filter((rest) => {
            if (rest._id == restId) {
                return rest
            }
        })
        setRestaurant(singleRest);
        setMainimage(restaurant[0]?.images[0])
    }, [Restaurants])
    useEffect(() => {
        dispatch(allrestaurant());
    }, [])
    return (
        <>
            <Navbar />
            <div className="singleviewContainer">
                <div className="singleviewWrapper">
                    <div className="imageCourosel">
                        <img src={mainImage} alt="" />
                    </div>
                    <div className="imageGridcontainer">
                        <div className="imgrow">
                            {restaurant[0]?.images.map((images, index) => (
                                <img src={images} alt="" key={index} onClick={() => viewImage(index)} />
                            ))}
                        </div>
                    </div>
                    <div className="detailsContainer">
                        <div className="headingdiv">
                            <h3>{restaurant[0]?.restaurantname}</h3>
                            <p>{restaurant[0]?.location}</p>
                            <p>{restaurant[0]?.menutype}</p>
                            <p>
                                <span>Excellent</span>
                                <span>{restaurant[0]?.rating[0]} *</span>
                            </p>

                            <div className="description">
                                <p>{restaurant[0]?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="datePickbtn">
                        <button onClick={()=>{Navigate('/availabledates',{state:{restaurant:restaurant}})}}>CHECK AVAILABILITY</button>
                    </div>

                </div>

            </div>
            <Reviews />
            <Footer />


        </>
    )
}

export default RestSingleview
