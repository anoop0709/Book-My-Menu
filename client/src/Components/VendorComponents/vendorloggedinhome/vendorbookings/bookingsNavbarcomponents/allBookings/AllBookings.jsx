import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  allBookings,
  getAllusers,
} from "../../../../../../actions/AdminActions";
import "./AllBookings.css";
import { Modal, Container, Row, Col } from "react-bootstrap";

function AllBookings() {
  const [visible, setVisible] = useState(3);
  const [searchValues, setSearchValues] = useState("");
  const [displayBookings, setDispalyBookings] = useState([]);
  const [mainloading, setMainLoading] = useState(true);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showmenu, setShowmenu] = useState(false);
  const [showuser, setShowuser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("vendor"))
  );
  const users = useSelector((state) => {
    return state.AllUsers.authData;
  });
  const loadMore = () => {
    setVisible(visible + 2);
  };
  const allBooking = useSelector((state) => {
    return state.Allbookings.authData;
  });
  const vendorBookings = allBooking?.filter((booking) => {
    if (booking?.restaurantId === profile?.restId) {
      return booking;
    }
  });

  const menuDetails = (details) => {
    setMenu(details);
  };
  const editClose = () => {
    setShowmenu(false);
  };
  const Close = () => {
    setShowuser(false);
  };
  useEffect(() => {
    dispatch(allBookings());
    dispatch(getAllusers());
    setTimeout(() => {
      setMainLoading(false);
      setDispalyBookings(vendorBookings);
    }, 2000);
  }, [loading, mainloading, searchValues]);

  const userDetails = (userid) => {
    setLoading(true);
    const UserDet = users?.filter((singleUser) => {
      if (singleUser._id === userid) {
        return singleUser;
      }
    });
    setTimeout(() => {
      setCustomer(UserDet);
      setLoading(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (searchValues) {
      const filteredBookings = vendorBookings?.filter((booking) => {
        if (booking?.bookedDate.date === searchValues) {
          return booking;
        }
      });
      setDispalyBookings(filteredBookings);
    } else {
      setDispalyBookings(vendorBookings);
    }
  };

  return (
    <>
      <div className="resMainconatainer">
        <div className="resMainwrapper">
          <div className="resMainmenu">
            <div className="menulist-items">
              <div className="restList">
                <div className="restinput">
                  <label htmlFor="">Date : </label>
                  <input
                    type="date"
                    name="bookedDate"
                    onChange={(e) => {
                      setSearchValues(e.target.value);
                    }}
                    className="bookingSearchInput"
                  />
                </div>
                <button onClick={handleSearch}>search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="BookingsHistoryContainer">
        <div className="BookinghistoryWrapper">
          <div className="headingList">
            <li className="headingItems">CUSTOMER DETAILS</li>
            <li className="headingItems">DATE</li>
            <li className="headingItems">TIME</li>
            <li className="headingItems">NUMBER OF PEOPLE</li>
            <li className="headingItems">MENU</li>
            <li className="headingItems">PAYMENT TYPE</li>
            <li className="headingItems">TOTAL AMOUNT</li>
          </div>
          {mainloading && <div>Loading...</div>}
          <div className="bookingList">
            {displayBookings?.slice(0,visible).map((details, index) => (
              <div className="bookingsRow" key={index}>
                <li className="bookingrowItem">
                  <button
                    className="itembtn"
                    key={index}
                    onClick={() => {
                      setShowuser(true);
                      userDetails(details?.userId);
                    }}
                  >
                    Customer Details
                  </button>
                </li>
                <li className="bookingrowItem">{details?.bookedDate?.date}</li>
                <li className="bookingrowItem">{details?.timeSlot}</li>
                <li className="bookingrowItem">
                  {details?.bookedDate?.number}
                </li>
                <li className="bookingrowItem">
                  <button
                    className="itembtn"
                    key={index}
                    onClick={() => {
                      setShowmenu(true);
                      menuDetails(details?.menuItems);
                    }}
                  >
                    Menu
                  </button>
                </li>
                <li className="bookingrowItem">{details?.paymentMethod}</li>
                <li className="bookingrowItem">£ {details?.totalAmount}</li>
              </div>
            ))}

            {showmenu && (
              <Modal show={showmenu} onHide={editClose} centered size="l">
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{
                      color: "brown",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    Menu
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "brown", width: "100%" }}>
                  <Container style={{ color: "brown", width: "100%" }}>
                    {menu?.map((items, index) => (
                      <>
                        <Row key={index}>
                          <Col xs={2} md={3}>
                            {items?.itemsMenu.itemName}
                          </Col>
                          <Col xs={2} md={3}>
                            {items?.itemsMenu.itemDescription}
                          </Col>
                          <Col xs={1} md={1}>
                            {items?.qty}
                          </Col>
                          <Col xs={2} md={3}>
                            £ {items?.itemsMenu.itemPrice}.00
                          </Col>
                        </Row>
                        <hr />
                      </>
                    ))}
                  </Container>
                </Modal.Body>
              </Modal>
            )}
            {showuser && (
              <Modal
                show={showuser}
                onHide={Close}
                centered
                style={{ width: "30%" }}
              >
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{
                      color: "brown",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    Customer Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    color: "brown",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {loading ? (
                    <div className="load">loading...</div>
                  ) : (
                    <div
                      style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexDirection: "column",
                        position: "relative",
                        gap: "5px",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "15px",
                          margin: 0,
                        }}
                      >
                        Full Name:{" "}
                        <span style={{ fontSize: "12px" }}>
                          {" "}
                          {customer[0].firstname} {customer[0].lastname}{" "}
                        </span>
                      </p>
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "15px",
                          margin: 0,
                        }}
                      >
                        Email:{" "}
                        <span style={{ fontSize: "12px" }}>
                          {customer[0].email}
                        </span>
                      </p>
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "15px",
                          margin: 0,
                        }}
                      >
                        Phone Number:
                        <span style={{ fontSize: "12px" }}>
                          {" "}
                          {customer[0].phonenumber}
                        </span>
                      </p>
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "15px",
                          width: "100%",
                        }}
                      >
                        Address:
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            width: "fit-content",
                            top: "0px",
                            marginLeft: "50px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              width: "80%",
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "center",
                              marginLeft: "20px",
                            }}
                          >
                            {customer[0].address[0].Housename},
                            <br />
                            {customer[0].address[0].Streetname},
                            <br />
                            {customer[0].address[0].City},
                            <br />
                            {customer[0].address[0].Postcode}
                          </span>
                        </div>
                      </p>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            )}
          </div>
          {
           visible < displayBookings?.length ? (
        
          <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button className="btnMore" onClick={loadMore}>
                Load More
              </button>
            </div>
                
           ):(
            null
           )
          }
        </div>
      </div>
    </>
  );
}

export default AllBookings;
