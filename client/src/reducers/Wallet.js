export const WalletInfo = (state ={authData:{},error:""},action)=>{
    switch (action.type) {
        case "USERWALLET":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "WALLETERROR" :
            return {...state,error:action.payload};
        case "RESETERROR" : 
            return {...state,error:action.payload}    
        default:
           return state;
    }
}