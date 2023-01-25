import axios from "axios";
const Api = axios.create({ baseURL: "http://localhost:3001" });
Api.interceptors.request.use((req) => {
    if (localStorage.getItem('admin')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('admin')).Token}`

    }
    return req;

})



export const AdminLogin = (FormData) =>  Api.post('/admin/admin_Login', FormData)
export const AdminSignup = (FormData) => Api.post('/admin/admin_Signup', FormData);


export const allUsers = ()=> Api.get('/admin/all_users');
export const BlockUser = (id) => Api.patch(`/admin/block_user/${id}`);
export const unBlockUser = (id) => Api.patch(`/admin/unblock_user/${id}`)


export const allVendors = ()=> Api.get('/admin/all_vendors');
export const BlockVendor = (id) => Api.patch(`/admin/block_vendor/${id}`);
export const unBlockVendor = (id) => Api.patch(`/admin/unblock_vendor/${id}`)
export const getNewVendors = ()=> Api.get('/admin/getnew_vendors');
export const getAllRestaurant = ()=>Api.get('/admin//all_restaurant');
export const VerifyVendor = (id)=> Api.patch(`/admin/verify_vendor/${id}`);