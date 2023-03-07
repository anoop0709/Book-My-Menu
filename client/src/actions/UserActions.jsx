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
        console.log(data);
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

export const paypalPay = (dateobj, time,restaurantId,orderID,menuItems,user,Total,payer,data,Navigate) => async (dispatch) => {
    try {
        const Data = await api.payPalOrder(dateobj, time,restaurantId,orderID,menuItems,user,Total,payer,data);
        console.log(Data);
        if(Data){
            dispatch({type:'BOOKINGS',payload:Data.data})
            Navigate('/user_bookings')
        }
    } catch (error) {
        console.log(error);
    }
}

export const addAddress = (address,userid)=> async (dispatch) =>{
    try {
        console.log(address,userid);
        const user = await api.add_Address(address,userid);
        dispatch({type:'USER',payload:user.data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
        
    }
}
export const update_Details = (firstname,lastname,phonenumber,userid) => async (dispatch)=>{
    try {
        console.log(firstname,lastname,phonenumber,userid);
        const user = await api.update_details(firstname,lastname,phonenumber,userid);
        dispatch({type:'USER',payload:user.data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
    }
}
export const dele_Address = (idx,userid) => async (dispatch) =>{
    try {
        console.log(idx,userid);
        const user = await api.del_Address(idx,userid);
        dispatch({type:'USER',payload:user.data})
    } catch (error) {
        console.log(error);
        dispatch({type:'USERERROR',payload:error.response.data})
        
    }
}
export const updatePass = (password,userid) => async (dispatch) => {
    try {

        console.log(password,userid);
        const {data} = await api.update_Pass(password,userid);
        console.log(data);
        dispatch({type:'PASSWORDSUCCESS',payload:data})
    } catch (error) {
        console.log(error);
        dispatch({type:'PASSWORDERROR',payload:error.response.data})
    }
}
export const allUserBookings = (userid) => async (dispatch) =>{
    try {
        console.log(userid);
        const {data} = await api.all_User_Bookings(userid);
        if(data){
            dispatch({type:"ALLUSERBOOKINGS", payload:data})
        }
    } catch (error) {
        dispatch({type:"ALLUSERBOOKINGERROR",payload:error.response.data})
        
    }
}