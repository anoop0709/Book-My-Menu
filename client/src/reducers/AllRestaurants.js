export const AllRestaurants = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "ALLRESTAURANT":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "ALLRESTERROR":
            return {error:action.payload};
        default:
           return state;
    }
}