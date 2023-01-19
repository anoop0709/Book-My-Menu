import * as api from "../Api/Userapi"




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
        dispatch({type:'USERLOGINERROR',payload:error.response.data})
    }
}







