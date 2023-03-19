import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUserBookings } from "../../../../actions/UserActions";
import { allrestaurant } from "../../../../actions/AdminActions";
import "./Bookings.css";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Bookings() {
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState([]);
  const [menu, setMenu] = useState([]);
  const [showrest, setShowrest] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const user = useSelector((state) => {
    return state?.UserInfo.authData;
  });
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const userallBookings = useSelector((state) => {
    return state.AlluserBookings.authData;
  });
  const Restaurants = useSelector((state) => {
    return state.AllRestaurants.authData;
  });
  const restDetails = (restid) => {
    const singleRest = Restaurants?.filter((rest) => {
      if (rest._id === restid) {
        return rest;
      }
    });
    setRestaurant(singleRest);
  };
  const menuDetails = (details) => {
    setMenu(details);
  };
  console.log(menu);
  console.log(Restaurants);
  const handleEditClose = () => {
    setShowrest(false);
  };
  const editClose = () => {
    setShowmenu(false);
  };
  useEffect(() => {
    dispatch(allrestaurant());
    dispatch(allUserBookings(profile?.userId));
  }, []);
  return (
    <div className="BookingsHistoryContainer">
      <div className="BookinghistoryWrapper">
        <div className="headingList">
          <li className="headingItems">DATE</li>
          <li className="headingItems">TIME</li>
          <li className="headingItems">NUMBER OF PEOPLE</li>
          <li className="headingItems">RESTAURANT</li>
          <li className="headingItems">MENU</li>
          <li className="headingItems">TOTAL AMOUNT</li>
        </div>
        <div className="bookingList">
          {userallBookings?.map((details, index) => (
            <div className="bookingsRow" key={index}>
              <li className="bookingrowItem">{details.bookedDate?.date}</li>
              <li className="bookingrowItem">{details.timeSlot}</li>
              <li className="bookingrowItem">{details.bookedDate?.number}</li>
              <li className="bookingrowItem">
                <button
                  className="itembtn"
                  key={index}
                  onClick={() => {
                    setShowrest(true);
                    restDetails(details.restaurantId);
                  }}
                >
                  Restaurant
                </button>
                {showrest && (
                  <Modal
                    show={showrest}
                    onHide={handleEditClose}
                    size="m"
                    centered
                    animation
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="rest">Restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="restaurant">
                        <p>Name: {restaurant[0].restaurantname}</p>
                        <p>Address: {restaurant[0].address}</p>
                        <p>Location: {restaurant[0].location}</p>
                        <p>Menu Type: {restaurant[0].menutype}</p>
                        <p>Type of Cusine: {restaurant[0].typeofcusine}</p>
                        <p>Opening Hours: {restaurant[0].openinghours}</p>
                        <p>Closing Hours: {restaurant[0].closinghours}</p>
                        <p>Phone Number: {restaurant[0].phonenumber}</p>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
              </li>
              <li className="bookingrowItem">
                <button
                  className="itembtn"
                  key={index}
                  onClick={() => {
                    setShowmenu(true);
                    menuDetails(details.menuItems);
                  }}
                >
                  Menu
                </button>
              </li>
              <li className="bookingrowItem">£ {details.totalAmount}</li>
            </div>
          ))}

          {showmenu && (
            <Modal show={showmenu} onHide={editClose} centered size="l">
              <Modal.Header closeButton>
                <Modal.Title>Menu</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  {menu?.map((items, index) => (
                    <>
                      <Row key={index}>
                        <Col xs={2} md={3}>
                          {items.itemsMenu.itemName}
                        </Col>
                        <Col xs={2} md={3}>
                          {items.itemsMenu.itemDescription}
                        </Col>
                        <Col xs={1} md={1}>
                          {items.qty}
                        </Col>
                        <Col xs={2} md={3}>
                          £ {items.itemsMenu.itemPrice}.00
                        </Col>
                        <Col xs={2} md={1}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Col>
                      </Row>
                      <hr />
                    </>
                  ))}
                </Container>
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
