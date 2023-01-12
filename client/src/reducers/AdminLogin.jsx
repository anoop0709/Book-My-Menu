export const AdminAuthReducer = (state ={authData:null,error:null},action)=>{
    switch (action.type) {
        case "ADMINAUTH":
            console.log(action.payload);
            localStorage.setItem('admin',JSON.stringify({...action.payload}))
            return {...state,authData:action.payload};
        case "ADMINLOGOUT":
            localStorage.clear();
            return {...state,authData:null};
        case "ADMINLOGINERROR":
            
            return {...state,error:action.payload}

        default:
           return state;
    }
}