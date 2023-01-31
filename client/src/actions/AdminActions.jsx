import * as Api from "../Api/Adminapi"





//ADMIN AUTHENTICATION


export const adminLogin = (formData, Navigate) => async (dispatch) => {
    try {
        const { data } = await Api.AdminLogin(formData);
        console.log(data);
        dispatch({ type: 'ADMINAUTH', payload: data });
        Navigate("/adminhome");
    } catch (error) {
        console.log(error);
        dispatch({ type: 'ADMINLOGINERROR', payload: error.response.data })
    }
}

export const adminsignUp = (formData, Navigate) => async (dispatch) => {
    try {
        const { data } = await Api.AdminSignup(formData);
        console.log(data);
        dispatch({ type: 'ADMINAUTH', payload: data });
        Navigate('/adminhome')
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'ADMINLOGINERROR', payload: error.response.data })
    }
}





//USER ADMIN ACTIONS


export const getAllusers = () => async (dispatch) => {
    try {
        console.log(1234);
        const Users = await Api.allUsers();
        console.log(Users.data);
        dispatch({ type: "ALLUSERS", payload: Users.data })
    } catch (error) {
        console.log(error);
    }
}

export const blockUser = (id) => async (dispatch) => {
    try {
        const Users = await Api.BlockUser(id);
        dispatch({ type: "ALLUSERS", payload: Users.data })
    } catch (error) {
        console.log(error);
    }
}
export const unblockUser = (id) => async (dispatch) => {
    try {
        const Users = await Api.unBlockUser(id);
        dispatch({ type: "ALLUSERS", payload: Users.data })

    } catch (error) {
        console.log(error);
    }
}




//VENDOR ADMIN ACTIONS


export const getAllvendors = () => async (dispatch) => {
    try {

        const Vendors = await Api.allVendors();
        console.log(Vendors.data);
        dispatch({ type: "ALLVENDORS", payload: Vendors.data })
    } catch (error) {
        console.log(error);
    }
}

export const blockVendor = (id) => async (dispatch) => {
    try {
        const Vendors = await Api.BlockVendor(id);
        console.log(Vendors.data);
        dispatch({ type: "ALLVENDORS", payload: Vendors.data })
    } catch (error) {
        console.log(error);
    }
}


export const unblockVendor = (id) => async (dispatch) => {
    try {
        const Vendors = await Api.unBlockVendor(id);
        console.log(Vendors.data);
        dispatch({ type: "ALLVENDORS", payload: Vendors.data })
    } catch (error) {
        console.log(error);

    }
}

export const newVendors = () => async (dispatch) => {
    try {
        const newVendors = await Api.getNewVendors();
        console.log(1233121);
        console.log(newVendors.data);
        dispatch({type:"NEWVENDORS",payload:newVendors.data})
        
    } catch (error) {
        console.log(error);
    }

}
export const allrestaurant = ()=> async (dispatch)=>{
    try {
        const Restaurants = await Api.getAllRestaurant();
        console.log(Restaurants.data);
        dispatch({type:"ALLRESTAURANT",payload:Restaurants.data})
    } catch (error) {
        console.log(error);
        dispatch({type:"ALLRESTERROR"})
    }
}

export const verifyVendor = (id) => async (dispatch)=>{
    try {
        const newVendors = await Api.VerifyVendor(id);
        dispatch({type:"NEWVENDORS",payload:newVendors.data})
        
    } catch (error) {
        console.log(error);
    }
}