export const NewVendors = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "NEWVENDORS":
            console.log(action.payload);
            return {...state,authData:action.payload};
        default:
           return state;
    }
}