export const PasswordChange = (state ={authData:null,error:null},action)=>{
    switch (action.type) {
        case "PASSWORDSUCCESS":
            console.log(action.payload);
            return {authData:action.payload};
        case "PASSWORDERROR":
            return {error:action.payload}
        default:
           return state;
    }
}