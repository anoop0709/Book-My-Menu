
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
export const checkExistingUser = ({email}) => API.post('/check_email',{email})


