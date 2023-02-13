import React, { useEffect, useState } from 'react'
import "./AvailableDate.css"
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar"
import Footer from '../../../Components/userhomepageComponents/Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { slotCheck } from '../../../actions/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function AvailableDate() {
    const Navigate = useNavigate();
    const slots = useSelector((state) => { return state.AvailableSlots.authData });
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState("");
    const [seatavailable, setSeatavailable] = useState(false);
    const [dateobj, setDateobj] = useState({
        date: "",
        number: "",
    });

    const Location = useLocation();
    const { restaurant } = Location.state;
    console.log(restaurant);
    const dispatch = useDispatch();
    const timeSlot = slots?.range?.map((item) => {
        if (!slots?.restBooked[0]?.length) {
            return item
        } else {
            console.log(slots?.restBooked[0]?.obj[item]);
            if (slots?.restBooked[0]?.obj[item] < restaurant?.seatingcapacity) {
                return item
            }
        }
    })
    let availableSeats = 0;
    const chooseSlot = (tm) => {
        console.log(tm);
       
        console.log(slots?.restBooked?.length);
        if(slots?.restBooked?.length){
            console.log(slots.restBooked[0].obj[tm]);
            availableSeats = slots.restBooked[0].obj[tm];
        }
        console.log(availableSeats);
        const totalSeats = parseInt(dateobj.number) + availableSeats;
        console.log(totalSeats);
        if (totalSeats <= restaurant[0]?.seatingcapacity) {
            setTime(tm)
            setSeatavailable(false)
        } else {
            setSeatavailable(true)
            setTime("");
        }
    }

  
    const checkSlot = () => {
        const id = restaurant[0]._id;
        console.log(dateobj);
        dispatch(slotCheck(id, dateobj, setLoading))
        setLoading(true)
    }
    const handleChange = (e) => {
        setDateobj({ ...dateobj, [e.target.name]: e.target.value })
    }
    useEffect(() => {


    }, [loading])
   
    console.log(restaurant[0].seatingcapacity);
    
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
                            <input type="date" name="date" required min={today} onChange={handleChange} />
                            <input type="number" required placeholder="Number of people" name="number"  onChange={handleChange} />
                            <div className="btn">
                                <button onClick={checkSlot}>Check Available Slots</button>
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
                          {seatavailable &&  <div className="error">
                              <p>Seats not available for {dateobj.number} people at this time-slot </p>
                              </div>}
                            <div className="availableSlotWrapper">
                                {timeSlot?.map((tm, index) => (
                                    <div className={(slots?.restBooked[0]?.obj[tm] < (restaurant.seatingcapacity)) ? "slotbox-orange" : "slotBox"} key={index} onClick={() => { chooseSlot(tm) }}>
                                        <span>
                                            {(time === tm) && <FontAwesomeIcon icon={faCheckCircle} className="check" />}
                                        </span>
                                        <p>{tm}</p>
                                        <p>1 HOUR WINDOW</p>
                                        <p>Available seats: {restaurant[0]?.seatingcapacity - (slots?.restBooked.length ? parseInt(slots?.restBooked[0]?.obj[tm]) : 0)}</p>
                                    </div>
                                ))
                                }
                                {time && (
                                    <div className="menuPickbtn">
                                        <button onClick={() => { Navigate('/menu', { state: { restaurant: restaurant, dateobj: dateobj, time } }) }}>SELECT MENU</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default AvailableDate
