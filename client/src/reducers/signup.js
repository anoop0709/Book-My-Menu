
export const AuthReducer = (state ={authData:null,error:null},action)=>{
    switch (action.type) {
        case "AUTH":
            console.log(action.payload);
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            return {...state,authData:action.payload};
        case "LOGOUT":
            localStorage.removeItem('profile');
            return {...state,authData:null};
        case "USERLOGINERROR":
            return {...state,error:action.payload}

        default:
           return state;
    }
}