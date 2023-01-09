
import axios from "axios";
const API = axios.create({baseURL:"http://localhost:3001"});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).Token}`;
        
    }
    return req;

})


export const userLogin = (FormData)=> API.post('/signin',FormData);
export const userSignup = (FormData)=> API.post('/signup',FormData);