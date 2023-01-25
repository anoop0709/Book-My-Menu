import * as aPi from "../Api/Vendorapi"

export const vendorSignup = (formData,Navigate) => async (dispatch)=>{
    try{
        console.log(formData);
        const {data} = await aPi.VendorSignUp(formData);
        if(data){
           setTimeout(()=>{
               Navigate('/vendor')

           },2000)
        }
     }catch(error){
        console.log(error);
        dispatch({type:'VENDORLOGINERROR',payload:error.response.data})
    }
}

export const vendorLogin = (formData,Navigate) => async (dispatch)=>{
    try {
        console.log(formData);
        const {data} = await aPi.VendorLogIn(formData);
        console.log(data);
        if(data){
            dispatch({type:"VENDORAUTH",payload:data})
            Navigate('/vendordashborad')
        }
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'VENDORLOGINERROR',payload:error.response.data})
    }
}
