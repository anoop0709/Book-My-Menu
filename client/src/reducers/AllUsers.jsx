export const AllUsers = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "ALLUSERS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        default:
           return state;
    }
}