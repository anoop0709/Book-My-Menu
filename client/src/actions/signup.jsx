import * as api from "../Api/Userapi"
import * as Api from "../Api/Adminapi"
import * as aPi from "../Api/Vendorapi"


export const signUp = (formData,Navigate) => async (dispatch)=>{
    try {
        console.log(formData);
        const  {data}  = await api.userSignup(formData);
        dispatch({type:'AUTH',payload:data})
        Navigate('/')
    } catch (error) {
        console.log(error);
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
        dispatch({type:'USERLOGINERROR',payload:error})
    }
}

export const adminLogin = (formData,Navigate) => async (dispatch)=>{
    try {
        const {data} = await Api.AdminLogin(formData);
        console.log(data);
        dispatch({type:'ADMINAUTH',payload:data});
        Navigate("/adminhome");
    } catch (error) {
        console.log(error.message);
        dispatch({type:'ADMINLOGINERROR',payload:error.message})
    }
}

export const adminsignUp = (formData,Navigate) => async (dispatch)=>{
    try {
        const {data} = await Api.AdminSignup(formData);
        console.log(data);
        dispatch({type:'ADMINAUTH',payload:data});
        Navigate('/adminhome')
    } catch (error) {
        console.log(error);
        dispatch({type:'ADMINLOGINERROR',payload:error.message})
    }
}


export const vendorSignup = (formData,Navigate) => async (dispatch)=>{
    try{
        const {data} = await aPi.VendorSignUp(formData);
        if(data){
           setTimeout(()=>{
               Navigate('/vendor')

           },20000)
        }
     }catch(error){
        console.log(error);
        dispatch({type:'VENDORLOGINERROR',payload:error.message})
    }
}

export const vendorLogin = (formData,Navigate) => async (dispatch)=>{
    try {
        const {data} = await aPi.VendorLogIn(formData);
        if(data){
            dispatch({type:"VENDORAUTH",payload:data})
            Navigate('/vendor')
        }
    } catch (error) {
        console.log(error);
        dispatch({type:'VENDORLOGINERROR',payload:error.message})
    }
}