export const VendorAuthReducer = (state ={authData:null,error:null},action)=>{
    switch (action.type) {
        case "VENDORAUTH":
            console.log(action.payload);
            localStorage.setItem('vendor',JSON.stringify({...action.payload}))
            return {...state,authData:action.payload};
        case "VENDORLOGOUT":
            localStorage.removeItem('vendor');
            return {...state,authData:null};
        case "VENDORLOGINERROR":
            return {...state,error:action.payload}

        default:
           return state;
    }
}