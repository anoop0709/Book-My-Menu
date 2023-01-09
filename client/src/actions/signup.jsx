import * as api from "../Api/index"


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

