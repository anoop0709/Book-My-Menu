
import axios from "axios";
const API = axios.create({baseURL:"http://localhost:3001"});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        return req;

    }
})


export const usersignin = (FormData)=> API.post('/signin',FormData);
export const usersignup = (FormData)=> API.post('/signup',FormData);