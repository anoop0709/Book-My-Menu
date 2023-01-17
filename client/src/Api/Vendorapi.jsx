import axios from "axios";
const aPi = axios.create({ baseURL: "http://localhost:3001" });
aPi.interceptors.request.use((req) => {
    if (localStorage.getItem('vendor')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('vendor')).Token}`

    }
    return req;

})


export const VendorSignUp = (FormData) => aPi.post('/vendor/vendorSignup', FormData);
export const VendorLogIn = (FormData) => aPi.post('/vendor/vendorLogin', FormData);