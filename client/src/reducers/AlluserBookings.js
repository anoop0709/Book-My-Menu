export const AlluserBookings = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "ALLUSERBOOKINGS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "ALLUSERBOOKINGERROR":
            return {...state,error:action.payload}
        default:
           return state;
    }
}