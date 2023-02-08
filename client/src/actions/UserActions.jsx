import * as api from "../Api/Userapi"
import {useNavigate} from "react-router-dom"




export const signUp = (formData,Navigate) => async (dispatch)=>{
    try {
        console.log(formData);
        const  {data}  = await api.userSignup(formData);
        console.log(data);
        if(data === 'otp sent'){
         return 'otp sent'
        }
        dispatch({type:'AUTH',payload:data})
        Navigate('/')
    } catch (error) {
        console.log(error);
        dispatch({type:'USERLOGINERROR',payload:error.response.data})
    }
}
export const checkExistingUser = ({email}) => async (dispatch) =>{
    try {
        console.log(email);
        const {data} = await api.checkExistingUser({email});
        if(data){
            return "null"
        }
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERLOGINERROR',payload:error.response.data})
    }
}


export const logIn  = (formData,Navigate) => async (dispatch)=>{
    try{
        console.log(formData);
        const {data} = await api.userLogin(formData);
        console.log(data);
        dispatch({type:'AUTH',payload:data});
        if(data) Navigate('/');
    }catch(error){
       console.log(error);
        dispatch({type:'USERLOGINERROR',payload:error.response.data})
    }
}



export const get_user_info = (id,Navigate) => async (dispatch)=>{
    try {
        const {data} = await api.userInfo(id);
        dispatch({type:'USER',payload:data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
        Navigate('/error')
    }
}

export const add_to_wishlist = (id,fav,Navigate) => async (dispatch)=>{
    try {
       
        const {data} = await api.addtoWishlist(id,fav);
        dispatch({type:'USER',payload:data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
        Navigate('/error')
    }
}
export const delete_from_wishlist = (id,fav,Navigate) => async (dispatch)=>{
    try {
        console.log(id,fav);
        const {data} = await api.deletefromWishlist(id,fav);
        dispatch({type:'USER',payload:data})
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
        Navigate('/error')
    }
}
export const getrestMenu = (vendorId) => async (dispatch)=>{
    try {
        const Data = await api.getRestMenu(vendorId);
        console.log(Data.data.menu);
        dispatch({type:'RESTMENU',payload:Data.data.menu });        
    } catch (error) {
        console.log(error);
        dispatch({type:'MENUERROR',payload:error.response.Data})
    }
}

export const slotCheck = (id,data,setLoading) => async (dispatch) => {
    try {
        console.log(data);
         const Data = await api.SlotCheck(id,data);
         console.log(Data);
        if(Data){
            dispatch({type:'SLOT',payload:Data.data});
            setLoading(false);
           
        }
        
    } catch (error) {
        console.log(error);
        dispatch({type:'SLOTERROR',payload:error.response.data})
        
    }
}