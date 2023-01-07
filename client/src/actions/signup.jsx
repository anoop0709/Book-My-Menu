import * as api from "../Api/index"


export const signUp = (formData,Navigate) => async (dispatch)=>{
    try {
        const { data } = await api.usersignup(formData);
        dispatch({type:'AUTH',payload:data})
        Navigate('/')
    } catch (error) {
        console.log(error);
    }
}