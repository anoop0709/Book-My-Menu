import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons'
import "./AllRestaurants.css"
import Footer from '../Footer/Footer'
import Popular from '../PopularRestaurant/Popular'
import SortByCusine from './sortbycusine/SortByCusine'
import SortingComponent from './sortedrestaurantlist/SortingComponent'
import { useDispatch } from 'react-redux'
import { allrestaurant } from '../../../actions/AdminActions'

function AllRestaurants() {
    const dispatch = useDispatch()
    const [cusine, setCusine] = useState("ALL RESTAURANTS")
    const Type = ["ALL RESTAURANTS", "AMERICAN", "ARABIC", "ITALIAN", "SOUTH INDIAN", "NORTH INDIAN", "CHINEESE", "THAI", "VEGETARIAN", "NON VEGETARIAN"]
    useEffect(() => {
        dispatch(allrestaurant())

    },[])


    return (
        <>
            <Navbar />
            <div className="inpcontainer">
                <FontAwesomeIcon icon={faLocationDot} className="faIcon Location" />
                <input type="text" placeholder="Trivandrum" className="inpBox" />
                <FontAwesomeIcon icon={faSearch} className="faIcon " />
            </div>
            <div className="allRestcontainer">
                <div className="sortwrapper">
                    <SortByCusine setCusine={setCusine} />
                </div>
               
                    {Type.map((type)=>(
                        type === cusine && <SortingComponent cusine={cusine} />

                    ))}
              
            </div>
            <Popular />
            <Footer />

        </>
    )
}

export default AllRestaurants
