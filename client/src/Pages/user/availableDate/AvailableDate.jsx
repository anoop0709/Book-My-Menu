import React, { useEffect, useState } from 'react'
import "./AvailableDate.css"
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar"
import Footer from '../../../Components/userhomepageComponents/Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { slotCheck } from '../../../actions/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function AvailableDate() {
    const Navigate = useNavigate();
    const slots = useSelector((state) => { return state.AvailableSlots.authData });
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState("");
    const [data, setData] = useState({
        date: "",
        number: ""
    });

    const Location = useLocation();
    const { restaurant } = Location.state;
    console.log(restaurant);
    const dispatch = useDispatch();
    const timeSlot = slots?.restBooked?.map((slot) => {
        return slot.time;

    })
    console.log(timeSlot);
    const Ranges = slots?.range?.filter((item) => {
        if (!timeSlot.includes(item))
            return item;

    })

    console.log(Ranges);

    const checkSlot = () => {
        const id = restaurant[0]._id;
        console.log(data);
        dispatch(slotCheck(id, data, setLoading))
        setLoading(true)
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    useEffect(() => {


    }, [loading])
    console.log(slots);
    console.log(data);
    return (
        <>
            <Navbar />

            <div className="availableContainer">

                <div className="availableWrapper">
                    <div className="datePicker">
                        <div className="restDetails">
                            <h1>{restaurant[0].restaurantname}</h1>
                            <p>{restaurant[0].address}</p>
                            <p>{restaurant[0].location}</p>
                        </div>
                        <div className="date">
                            <input type="date" name="date" required onChange={handleChange} />
                            <input type="number" required placeholder="Number of people" name="number" onChange={handleChange} />
                            <div className="btn">
                                <button onClick={checkSlot}>Available slots</button>
                            </div>

                        </div>
                    </div>
                    {loading ? (
                        <div id="loaderContainer">
                            <div id="loader"></div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className="availableSlots">
                            <div className="availableSlotWrapper">
                                {Ranges?.map((tm, index) => (
                                    <div className="slotBox" key={index} onClick={() => { setTime(tm) }}>
                                        <span>{time === tm && <FontAwesomeIcon icon={faCheck} className="check"/>}</span>
                                        <p>{tm}</p>
                                        <p>1 HOUR WINDOW</p>
                                        <p>Available seats: 40</p>
                                    </div>
                                ))
                                }
                                {Ranges?.length && (
                                <div className="menuPickbtn">
                                    <button onClick={() => { Navigate('/menu', { state: { restaurant: restaurant } }) }}>SELECT MENU</button>
                                </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </>
    )
}

export default AvailableDate
