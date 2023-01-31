export const SingleRestaurant = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "SINGLERESTAURANT":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "SINGLERESTERROR":
            return {error:action.payload};
        default:
           return state;
    }
}