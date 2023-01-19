import * as Api from "../Api/Adminapi"


export const adminLogin = (formData,Navigate) => async (dispatch)=>{
    try {
        const {data} = await Api.AdminLogin(formData);
        console.log(data);
        dispatch({type:'ADMINAUTH',payload:data});
        Navigate("/adminhome");
    } catch (error) {
        console.log(error);
        dispatch({type:'ADMINLOGINERROR',payload:error.response.data})
    }
}

export const adminsignUp = (formData,Navigate) => async (dispatch)=>{
    try {
        const {data} = await Api.AdminSignup(formData);
        console.log(data);
        dispatch({type:'ADMINAUTH',payload:data});
        Navigate('/adminhome')
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'ADMINLOGINERROR',payload:error.response.data})
    }
}
export const getAllusers = ()=>async (dispatch)=>{
    try {
        console.log(1234);
        const Users = await Api.allUsers();
        console.log(Users.data);
        dispatch({type:"ALLUSERS",payload:Users.data})
    } catch (error) {
        console.log(error);
    }
}

export const blockUser = (id) => async (dispatch) =>{
    try {
       const Users = await Api.BlockUser(id);
       dispatch({type:"ALLUSERS",payload:Users.data})
    } catch (error) {
        console.log(error);
    }
}
 export const unblockUser = (id) => async (dispatch) =>{
     try {
         const Users = await Api.unBlockUser(id);
         dispatch({type:"ALLUSERS",payload:Users.data})
         
     } catch (error) {
         console.log(error);
     }
 }