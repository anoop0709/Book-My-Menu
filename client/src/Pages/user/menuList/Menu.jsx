import React, { useEffect, useState } from 'react'
import "./Menu.css"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { allrestaurant } from '../../../actions/AdminActions'
import { getrestMenu } from '../../../actions/UserActions'
import Navbar from '../../../Components/userhomepageComponents/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons'


function Menu() {
    //const Restaurants = useSelector((state) => { return state.AllRestaurants.authData });
    const restMenu = useSelector((state) => { return state.Restmenu.authData });
    const [menuItems, setMenuitems] = useState(JSON.parse(localStorage.getItem('menu')));
    const [select, setSelect] = useState(JSON.parse(localStorage.getItem('menu')));
    const [checked,setChecked] = useState(JSON.parse(localStorage.getItem('menuname')))
    const [selectedmenu, setSelectedmenu] = useState([])
    let total= 0;
    const menus = ["starter", "sidedish", "maindish", "combos", "dessert", "beverages"]
    const Location = useLocation();
    const { restaurant } = Location.state;
    const dispatch = useDispatch();
   
    console.log(total);
    const reducerFunction = ()=>{
        total =  menuItems?.reduce((acc,itemlist)=>{
            console.log(itemlist.itemsMenu.itemPrice);
           return acc + parseInt(itemlist.itemsMenu.itemPrice)
     
         }
         ,0)
         console.log(total);
         return total
    }


    const addToMenu = (itemsMenu) => {

        console.log(itemsMenu);
        console.log(selectedmenu);
        if (selectedmenu.length) {
            const array = selectedmenu.filter((item) => {
                if (item.itemsMenu.itemName === itemsMenu.itemName) {
                    console.log(88888888);
                    item.qty += 1;
                    item.itemsMenu.itemPrice += parseInt(itemsMenu.itemPrice);
                    localStorage.setItem("menu", JSON.stringify(selectedmenu));
                    setMenuitems(JSON.parse(localStorage.getItem('menu')))
                    return item;
                }
            })
            if (!array.length) {
                console.log(7777777);
                selectedmenu.push({ itemsMenu, qty: 1 })
                localStorage.setItem("menu", JSON.stringify(selectedmenu));
                setMenuitems(JSON.parse(localStorage.getItem('menu')))
                select.push(itemsMenu.itemName)
                localStorage.setItem('menuname',JSON.stringify(select));
                setChecked(JSON.parse(localStorage.getItem('menuname')))
            }
        } else {
            console.log(666666666);
            selectedmenu.push({ itemsMenu, qty: 1 })
            localStorage.setItem("menu", JSON.stringify(selectedmenu));
            setMenuitems(JSON.parse(localStorage.getItem('menu')))
            select.push(itemsMenu.itemName)
            localStorage.setItem('menuname',JSON.stringify(select));
            setChecked(JSON.parse(localStorage.getItem('menuname')))


        }


    }

    const deleteMenuItem = (deleItem) =>{

    }
    useEffect(() => {
        dispatch(getrestMenu(restaurant[0].vendorId))
       

    }, [menuItems,checked]);

    useEffect(()=>{
        reducerFunction();
    },[])

    console.log(menuItems);
    console.log(restMenu);
    console.log(selectedmenu);
    console.log(select);

    return (
        <>
            <Navbar />
            <section className="menuContainer">
                <div className="image">
                    <img src={restaurant[0]?.images[0]} alt="" />
                </div>
                <div className="menuwrapper">
                    <div className="menuItemsdiv">
                        {menus.map((menu) => (
                            <div className="dishList">
                                <h1>{menu.toUpperCase()}</h1>
                                <div className="dishMenu">
                                    <table>
                                        <tbody>
                                            {
                                                restMenu?.[menu]?.map((items, index) => (
                                                    <tr key={index} onClick={() => { addToMenu(items) }}>
                                                        <div className="text">
                                                            <td>{items?.itemName.toUpperCase()}</td>
                                                            <td>{items?.itemDescription}</td>
                                                        </div>
                                                        <td>£ {items?.itemPrice}.00
                                                        {checked?.map((name)=>(
                                                            (name===items.itemName) && (
                                                            <span>
                                                                <FontAwesomeIcon className="tickIcon" icon={faCircleCheck} />
                                                            </span>
                                                            )
                                                        ))}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="selectedMenu">
                        <h1>YOUR MENU</h1>
                        <div className="MenuItems">
                        <div className="listMenu">
                                    <p>Dish</p>
                                    <p>Qty</p>
                                    <p>Price</p>
                                </div>
                        </div>
                        <div className="MenuItems">
                            {menuItems?.map((itemlist,index) => (
                                <div className="listMenu" key={index}>
                                    <p>{itemlist?.itemsMenu.itemName.toUpperCase()} </p>
                                    <p>{itemlist?.qty}</p>
                                    <p>{itemlist?.itemsMenu.itemPrice}.00</p>
                                    <FontAwesomeIcon className="iconTrash" icon={faTrash} onClick={()=>deleteMenuItem(itemlist)}/>
                                </div>
                            ))}
                        </div>
                        <div className="total">
                            <h5>Sub Total :£ {reducerFunction()}.00</h5>
                            <h6>VAT :£ {reducerFunction()*4/100} </h6>
                            <hr/>
                            <h5>Total :£ {reducerFunction() + (reducerFunction()*4/100)}</h5>
                        </div>
                    </div>
                </div>
 
            </section>
        </>
    )
}

export default Menu
