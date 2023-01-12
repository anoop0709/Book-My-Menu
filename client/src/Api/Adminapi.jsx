import axios from "axios";
const Api = axios.create({baseURL:"http://localhost:3001"});
Api.interceptors.request.use((req)=>{
   if(localStorage.getItem('admin')){
       console.log(12345);
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admin')).Token}`

   }
    return req;

})


console.log(176543234);
export const AdminLogin = (FormData)=> Api.post('/adminLogin',FormData);
export const AdminSignup = (FormData)=> Api.post('/adminSignup',FormData);