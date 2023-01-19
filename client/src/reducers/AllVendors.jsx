export const AllVendors = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "ALLVENDORS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        default:
           return state;
    }
}