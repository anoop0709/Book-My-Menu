import * as api from "../Api/Userapi"
import * as Api from "../Api/Adminapi"


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
        dispatch({type:'AUTH',payload:data});
        Navigate('/')
    }catch(err){
        console.log(err);
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
        dispatch({type:'ADMINAUTH',payload:data});
        Navigate('/')
    } catch (error) {
        console.log(error);
        // dispatch({type:'ADMINLOGINERROR',payload:error.message})
    }
}