export const UserInfo = (state ={authData:null,error:null},action)=>{
    switch (action.type) {
        case "USER":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "USERERROR" :
            return {...state,error:action.payload}
        default:
           return state;
    }
}