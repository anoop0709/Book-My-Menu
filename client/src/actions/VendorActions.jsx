import * as aPi from "../Api/Vendorapi"

export const vendorSignup = (formData, Navigate) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await aPi.VendorSignUp(formData);
        if (data === "otp sent"){return "sent otp"};
        if (data === "waiting for approval") {
            setTimeout(() => {
                Navigate('/vendor')
            }, 2000)
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: 'VENDORLOGINERROR', payload: error.response.data })
    }
}
export const vendorLogin = (formData, Navigate) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await aPi.VendorLogIn(formData);
        console.log(data);
        if (data) {
            dispatch({ type: "VENDORAUTH", payload: data })
            Navigate('/vendordashborad')
        }
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'VENDORLOGINERROR', payload: error.response.data })
    }
}
export const getRestDetails = (email) => async (dispatch)=>{
    try {
        const ResData = await aPi.GetRestDetails(email);
        console.log(ResData.data);
        ResData && dispatch({type:'SINGLERESTAURANT',payload:ResData.data});
    } catch (error) {

          dispatch({ type: 'SINGLERESTERROR', payload: error.response.data });
    }
}
export const getMenu = (email) => async (dispatch) => {
    try {
        const Data = await aPi.GetMenu(email);
        console.log(Data.data.menu);
        Data && dispatch({ type: "RESTMENU", payload: Data.data.menu })

    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'MENUERROR', payload: error.response.data });
    }
}

export const addDish = ({ data, email, collectionName }) => async (dispatch) => {
    try {
        const Data = await aPi.AddDish({ data, email, collectionName });
        console.log(Data);
        Data && dispatch({ type: "RESTMENU", payload: Data.data.menu })

    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'MENUERROR', payload: error.response.data });
    }
}
export const editDish = ({ data, index, email, collectionName }) => async (dispatch) => {
    try {
        const Data = await aPi.EditDish({ data, index, email, collectionName });
        console.log(Data);
        Data && dispatch({ type: "RESTMENU", payload: Data.data.menu });
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'MENUERROR', payload: error.response.data });
    }
}

export const deleDish = ({ index, email, item, collectionName }) => async (dispatch) => {
    try {
        const Data = await aPi.DeleDish({ index, email, item, collectionName })
        console.log(Data);
        Data && dispatch({ type: "RESTMENU", payload: Data.data.Menu });

    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'MENUERROR', payload: error.response.data });
    }
}

export const deleteRestImage = (email,image,index)=> async (dispatch) => {
    try {
        console.log(email,image,index);
        const ResData = await aPi.DeleteRestImage(email,image,index)
        console.log(ResData.data);
        ResData && dispatch({type:'SINGLERESTAURANT',payload:ResData.data});
    } catch (error) {

          dispatch({ type: 'SINGLERESTERROR', payload: error.response.data });
    }
}

export const addImage = (email,images)=> async (dispatch) => {
    try {
        console.log(email,images);
        const ResData = await aPi.AddImage(email,images);
        console.log(ResData.data);
        ResData && dispatch({type:'SINGLERESTAURANT',payload:ResData.data});
        
    } catch (error) {
        dispatch({ type: 'SINGLERESTERROR', payload: error.response.data });
    }
}