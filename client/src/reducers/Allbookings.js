export const Allbookings = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "ALLBOOKINGS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "ALLBOOKINGERROR":
            return {...state,error:action.payload}
        default:
           return state;
    }
}