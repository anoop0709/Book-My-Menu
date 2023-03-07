import { faBars, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allrestaurant } from '../../../../actions/AdminActions';
import { add_to_wishlist, delete_from_wishlist, get_user_info } from '../../../../actions/UserActions';
import "./Wishlist.css"

function Wishlist() {
  const user = useSelector((state)=>{return state.UserInfo.authData});
 const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
 const dispatch = useDispatch();
 const Navigate = useNavigate();

 const Restaurants = useSelector((state) => {
  return state.AllRestaurants.authData;
});
console.log(user);
const setColor = (id) => {
  if (profile?.userId) {
    dispatch(add_to_wishlist(profile?.userId, id, Navigate));
  } else {
    Navigate("/login");
  }
};
const resetColor = (restid) => {
  if (profile?.userId) {
    dispatch(delete_from_wishlist(profile?.userId, restid, Navigate));
  }
};

const singleView = (restId) => {
  Navigate("/singleview", { state: { restId: restId } });
};

useEffect(() => {
  dispatch(allrestaurant());
}, []);

useEffect(()=>{
  if(profile?.Token){
    dispatch(get_user_info(profile?.userId,Navigate))
  }
},[])

const filteredData = Restaurants?.filter((rest)=> {
 return user?.wishList?.some((id)=>{
    if(rest._id === id){
      return rest;
    }

  })
})
console.log(filteredData);
  return (
     <div className="allRestcontainer">
        {!!filteredData?.length && (
          <div className="allRestwrapper">
            {filteredData?.map((rest) => (
              <div className="restcard" key={rest?._id}>
                <img src={rest?.images[0]} alt="" />
                <div className="iconsForRest" key={rest?._id}>
                  {user?.wishList.length === 0 ||
                  !user?.wishList.includes(rest?._id) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="icons"
                      key={rest?._id}
                      onClick={() => setColor(rest?._id)}
                    />
                  ) : (
                    user?.wishList.map(
                      (id) =>
                        id === rest?._id && (
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="iconfav"
                            key={rest?._id}
                            onClick={() => resetColor(rest?._id)}
                          />
                        )
                    )
                  )}
                  <FontAwesomeIcon
                    icon={faBars}
                    className="icons"
                    onClick={() => singleView(rest?._id)}
                  />
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
      </div>
    
  )
}

export default Wishlist
