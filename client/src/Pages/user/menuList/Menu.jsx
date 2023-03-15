import React, { useEffect, useState } from "react";
import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { allrestaurant } from "../../../actions/AdminActions";
import { getrestMenu } from "../../../actions/UserActions";
import Navbar from "../../../Components/userhomepageComponents/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const restMenu = useSelector((state) => {
    return state?.Restmenu.authData;
  });
  const [menuItems, setMenuitems] = useState(
    JSON.parse(localStorage.getItem("menu"))
  );
  const [select, setSelect] = useState([]);
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("menuname"))
  );
  const [selectedmenu, setSelectedmenu] = useState([]);
  let total = 0;
  const menus = [
    "starter",
    "sidedish",
    "maindish",
    "combos",
    "dessert",
    "beverages",
  ];
  const Location = useLocation();
  const { restaurant, dateobj, time } = Location?.state;
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const reducerFunction = () => {
    total = menuItems?.reduce((acc, itemlist) => {
      console.log(parseInt(itemlist?.itemsMenu?.itemPrice));
      return acc + parseInt(itemlist?.itemsMenu?.itemPrice);
    }, 0);
    return total;
  };

  const addToMenu = (itemsMenu) => {
    console.log(itemsMenu);
    console.log(selectedmenu);
    if (selectedmenu.length) {
      const array = selectedmenu.filter((item) => {
        if (item.itemsMenu.itemName === itemsMenu.itemName) {
          item.qty += 1;
          let price = parseInt(item.itemsMenu.itemPrice);
          price += parseInt(itemsMenu.itemPrice);
          item.itemsMenu.itemPrice = price;
          localStorage.setItem("menu", JSON.stringify(selectedmenu));
          setMenuitems(JSON.parse(localStorage.getItem("menu")));
          return item;
        }
      });
      if (!array.length) {
        selectedmenu.push({ itemsMenu, qty: 1 });
        localStorage.setItem("menu", JSON.stringify(selectedmenu));
        setMenuitems(JSON.parse(localStorage.getItem("menu")));
        select.push(itemsMenu.itemName);
        localStorage.setItem("menuname", JSON.stringify(select));
        setChecked(JSON.parse(localStorage.getItem("menuname")));
      }
    } else {
      selectedmenu.push({ itemsMenu, qty: 1 });
      localStorage.setItem("menu", JSON.stringify(selectedmenu));
      setMenuitems(JSON.parse(localStorage.getItem("menu")));
      select.push(itemsMenu.itemName);
      localStorage.setItem("menuname", JSON.stringify(select));
      setChecked(JSON.parse(localStorage.getItem("menuname")));
    }
  };
  const changeQty = (items, value) => {
    console.log(items, value);
    if (selectedmenu.length) {
      if (value == 1) {
        const array = selectedmenu.filter((item) => {
          if (item.itemsMenu.itemName === items.itemsMenu.itemName) {
            if (item.qty >= 1) {
              let price = parseInt(item.itemsMenu.itemPrice);
              price += parseInt(items.itemsMenu.itemPrice) / item.qty;
              item.itemsMenu.itemPrice = price;
              console.log(items.itemsMenu.itemPrice, item.qty);
              item.qty += 1;
              localStorage.setItem("menu", JSON.stringify(selectedmenu));
              setMenuitems(JSON.parse(localStorage.getItem("menu")));
              return item;
            }
          }
        });
      }
      if (value == -1) {
        selectedmenu.filter((item) => {
          if (item.itemsMenu.itemName === items.itemsMenu.itemName) {
            if (item.qty > 1) {
              let price = parseInt(item.itemsMenu.itemPrice);
              price -= parseInt(items.itemsMenu.itemPrice) / item.qty;
              item.itemsMenu.itemPrice = price;
              item.qty -= 1;
              localStorage.setItem("menu", JSON.stringify(selectedmenu));
              setMenuitems(JSON.parse(localStorage.getItem("menu")));
              return item;
            } else {
              const index = selectedmenu.indexOf(item);
              selectedmenu.splice(index, 1);
              localStorage.setItem("menu", JSON.stringify(selectedmenu));
              setMenuitems(JSON.parse(localStorage.getItem("menu")));
              const menuIndex = select.indexOf(items.itemsMenu.itemName);
              select.splice(menuIndex, 1);
              localStorage.setItem("menuname", JSON.stringify(select));
              setChecked(JSON.parse(localStorage.getItem("menuname")));
            }
          }
        });
      }
    }
  };

  const deleteMenuItem = (deleItem) => {
    selectedmenu.filter((item) => {
      if (item.itemsMenu.itemName === deleItem.itemsMenu.itemName) {
        const index = selectedmenu.indexOf(item);
        selectedmenu.splice(index, 1);
        localStorage.setItem("menu", JSON.stringify(selectedmenu));
        setMenuitems(JSON.parse(localStorage.getItem("menu")));
        const menuIndex = select.indexOf(deleItem.itemsMenu.itemName);
        select.splice(menuIndex, 1);
        localStorage.setItem("menuname", JSON.stringify(select));
        setChecked(JSON.parse(localStorage.getItem("menuname")));
      }
    });
  };

  useEffect(() => {
    dispatch(getrestMenu(restaurant[0]?.vendorId));
  }, [menuItems, checked]);

  useEffect(() => {
    reducerFunction();
  }, []);

  return (
    <>
      <Navbar />

      <section className="menuContainer">
        <div className="image">
          <img src={restaurant[0]?.images[0]} alt="" />
        </div>

        <div className="menuwrapper">
          <div className="menuItemsdiv">
            {menus?.map((menu) => (
              <div className="dishList">
                <h1>{menu?.toUpperCase()}</h1>
                <div className="dishMenu">
                  <table>
                    <tbody>
                      {restMenu?.[menu]?.map((items, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            addToMenu(items);
                          }}
                        >
                          <div className="text">
                            <td>{items?.itemName.toUpperCase()}</td>
                            <td>{items?.itemDescription}</td>
                          </div>
                          <td>
                            £ {items?.itemPrice}.00
                            {checked?.map(
                              (name) =>
                                name === items?.itemName && (
                                  <span>
                                    <FontAwesomeIcon
                                      className="tickIcon"
                                      icon={faCircleCheck}
                                    />
                                  </span>
                                )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          {menuItems?.length ? (
            <div className="selectedMenu">
              <h5>YOUR MENU</h5>
              <>
                <div className="MenuItems">
                  <div className="listMenu">
                    <p>Dish</p>
                    <p>Qty</p>
                    <p>Price</p>
                  </div>
                </div>
                <div className="MenuItems">
                  {menuItems?.map((itemlist, index) => (
                    <div className="listMenu" key={index}>
                      <p>{itemlist?.itemsMenu?.itemName.toUpperCase()} </p>
                      <p>
                        <button
                          onClick={() => {
                            changeQty(itemlist, -1);
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>
                        {itemlist?.qty}
                        <button
                          onClick={() => {
                            changeQty(itemlist, 1);
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </p>

                      <p>{itemlist?.itemsMenu?.itemPrice}.00</p>
                      <FontAwesomeIcon
                        className="iconTrash"
                        icon={faTrash}
                        onClick={() => deleteMenuItem(itemlist)}
                      />
                    </div>
                  ))}
                </div>

                <div className="total">
                  <div className="subtotal">
                    <h5>Sub Total :</h5>{" "}
                    <span> £ {reducerFunction()} .00 </span>
                  </div>
                  <div className="subtotal">
                    <h6>VAT :</h6>
                    <span> £ {(reducerFunction() * 4) / 100}</span>{" "}
                  </div>
                  <div className="line"></div>
                  <div className="subtotal">
                    {" "}
                    <h5>Total :</h5>
                    <span>
                      {" "}
                      £ {reducerFunction() + (reducerFunction() * 4) / 100}
                    </span>
                  </div>
                </div>
                <div className="paymentBtn">
                  <button
                    className="payBtn"
                    onClick={() => {
                      Navigate("/paymentpage", {
                        state: {
                          restaurant: restaurant,
                          dateobj: dateobj,
                          time,
                          menuItems: menuItems,
                          reducerFunction: reducerFunction(),
                        },
                      });
                    }}
                  >
                    Payment
                  </button>
                </div>
              </>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Menu;
