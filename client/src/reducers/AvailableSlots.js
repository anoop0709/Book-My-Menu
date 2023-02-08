export const AvailableSlots = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "SLOT":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "SLOTERROR":
            return {...state,error:action.payload}
        default:
           return state;
    }
}