import axios from "axios";
const Api = axios.create({ baseURL: "http://localhost:3001" });
Api.interceptors.request.use((req) => {
    if (localStorage.getItem('admin')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admin')).Token}`

    }
    return req;

})



export const AdminLogin = (FormData) =>  Api.post('/admin/adminLogin', FormData)

export const AdminSignup = (FormData) => Api.post('/admin/adminSignup', FormData);