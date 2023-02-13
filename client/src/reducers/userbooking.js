export const UserBooking = (state ={authData:{},error:null},action)=>{
    switch (action.type) {
        case "BOOKINGS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "BOOKINGERROR":
            return {...state,error:action.payload}
        default:
           return state;
    }
}