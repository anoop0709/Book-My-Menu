export const Restmenu = (state ={authData:[],error:null},action)=>{
    switch (action.type) {
        case "RESTMENU":
            console.log(action.payload);
            return {...state,authData:action.payload};
        case "MENUERROR":   
            return {...state,error:action.payload} 
        default:
           return state;
    }
}