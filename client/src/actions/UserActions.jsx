import * as api from "../Api/Userapi"




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



export const get_user_info = (id) => async (dispatch)=>{
    try {
        const {data} = await api.userInfo(id);
        dispatch({type:'USER',payload:data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
    }
}

export const add_to_wishlist = (id,fav) => async (dispatch)=>{
    try {
       
        const {data} = await api.addtoWishlist(id,fav);
        dispatch({type:'USER',payload:data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
    }
}
export const delete_from_wishlist = (id,fav) => async (dispatch)=>{
    try {
        console.log(id,fav);
        const {data} = await api.deletefromWishlist(id,fav);
        dispatch({type:'USER',payload:data})
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
    }
}
