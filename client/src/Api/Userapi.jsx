
import axios from "axios";
const API = axios.create({baseURL:"http://localhost:3001"});
API.interceptors.request.use((req)=>{
    
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).Token}`
    } 
      return req;

})


export const userLogin = (FormData)=>  API.post('/signin',FormData);
export const userSignup = (FormData)=> API.post('/signup',FormData);
export const userInfo = (id)=> API.get(`/user_info/${id}`)
export const addtoWishlist = (id,fav)=> API.post(`/add_to_wishlist/${id}/${fav}`);
export const deletefromWishlist = (id,fav)=> API.post(`/dele_from_wishlist/${id}/${fav}`);
export const checkExistingUser = ({email}) => API.post('/check_email',{email});
export const getRestMenu = (vendorId) => API.post(`/get_menu/${vendorId}`)
export const SlotCheck = (id,Data) => API.post(`/get_slots/${id}`, Data);
export const payPalOrder = (dateobj,time,restaurantId,menuItems,user,Total,data,paymentMethod) => API.post('/book_slot',{dateobj, time,restaurantId,menuItems,user,Total,data,paymentMethod})
export const add_Address = ({address,userid}) => API.post('/add_address',{address,userid})
export const del_Address = (idx,userid) => API.post('/dele_address',idx,userid)
export const update_details = ({firstname,lastname,phonenumber,userid}) => API.post('/update_user',{firstname,lastname,phonenumber,userid})
export const update_Pass = ({password,userid}) => API.post('/update_password',{password,userid});
export const all_User_Bookings = (userid) => API.get(`/all_user_bookings/${userid}`);
export const wallet_Info = (userid) => API.get(`/wallet/${userid}`);
export const create_Wallet = (wallet,userid) => API.post('/wallet',{wallet,userid});
export const wallet_Dele = (userid) => API.delete(`/wallet/${userid}`);
export const wallet_Transaction = (amount,walletid,transactionType) => API.post('/money_transaction',{amount,walletid,transactionType})