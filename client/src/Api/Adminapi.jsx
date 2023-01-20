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


export const allUsers = ()=> Api.get('/admin/allusers');
export const BlockUser = (id) => Api.patch(`/admin/blockuser/${id}`);
export const unBlockUser = (id) => Api.patch(`/admin/unblockuser/${id}`)


export const allVendors = ()=> Api.get('/admin/allvendors');
export const BlockVendor = (id) => Api.patch(`/admin/blockvendor/${id}`);
export const unBlockVendor = (id) => Api.patch(`/admin/unblockvendor/${id}`)
export const getNewVendors = ()=> Api.get('/admin/getnewvendors');
export const getAllRestaurant = ()=>Api.get('/admin//allrestaurant');
export const VerifyVendor = (id)=> Api.patch(`/admin/verifyvendor/${id}`);