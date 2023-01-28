import axios from "axios";
const aPi = axios.create({ baseURL: "http://localhost:3001" });
aPi.interceptors.request.use((req) => {
    if (localStorage.getItem('vendor')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('vendor')).Token}`

    }
    return req;

})


export const VendorSignUp = (FormData) => aPi.post('/vendor/vendor_Signup', FormData);
export const VendorLogIn = (FormData) => aPi.post('/vendor/vendor_Login', FormData);
export const GetMenu = (email) => aPi.get(`/vendor/get_menu/${email}`);

export const AddDish = ({data,email,collectionName}) => aPi.post(`/vendor/add_dish/${email}`,{data,collectionName});
export const EditDish = ({data,index,email,collectionName}) => aPi.post('/vendor/edit_dish',{data,index,email,collectionName});
export const DeleDish = ({index,email,item,collectionName}) => aPi.post('/vendor/dele_dish',{index,email,item,collectionName});

