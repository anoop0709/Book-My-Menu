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

export const AddStarter = (data,email) => aPi.post(`/vendor/add_starter/${email}`,data);
export const EditStarter = ({data,index,email}) => aPi.post('/vendor/edit_starter',{data,index,email});
export const DeleDish = ({index,email,item}) => aPi.post('/vendor/dele_starter',{index,email,item});

export const AddSidedish = (data,email) => aPi.post(`/vendor/add_sidedish/${email}`,data);
export const EditSidedish = ({data,index,email}) => aPi.post(`/vendor/edit_sidedish`,{data,index,email});
export const DeleSidedish = ({index,email,item}) => aPi.post(`/vendor/dele_sidedish`,{index,email,item});