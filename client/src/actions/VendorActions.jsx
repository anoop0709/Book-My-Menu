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
export const getMenu = (email) => async (dispatch)=>{
    try {
        const Data = await aPi.GetMenu(email);
        console.log(Data.data.menu);
        Data && dispatch({type:"RESTMENU",payload:Data.data.menu})
        
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}

export const addStarter = (data,email) => async (dispatch)=>{
    try {
        const Data = await aPi.AddStarter(data,email);
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.menu})
        
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}
export const editStarter = ({data,index,email}) => async (dispatch)=>{
    try {
        const Data = await aPi.EditStarter({data,index,email});
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.Menu});
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}

export const deleDish = ({index,email,item}) => async (dispatch)=>{
    try {
        const Data = await aPi.DeleDish({index,email,item})
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.Menu});
        
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}
export const addSidedish = (data,email) => async (dispatch)=>{
    try {
        const Data = await aPi.AddSidedish(data,email);
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.menu})
        
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}
export const editSidedish = ({data,index,email}) => async (dispatch)=>{
    try {
        const Data = await aPi.EditSidedish({data,index,email});
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.Menu});
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}

export const deleSidedish = ({index,email,item}) => async (dispatch)=>{
    try {
        const Data = await aPi.DeleSidedish({index,email,item})
        console.log(Data);
        Data && dispatch({type:"RESTMENU",payload:Data.data.Menu});
        
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:'MENUERROR',payload:error.response.data});
    }
}