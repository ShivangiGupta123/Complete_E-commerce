const initialState = 0;
const ChangeNumber = (state = initialState, action)=>{
    switch(action.type)
    {
        case "INCREMENT" : return state + action.payload
 
        // case "totalPrice" : return state + action.payload

       
        default : return state
    }

}

export default ChangeNumber