export const UserReducer=(state=[],action)=>{
    switch(action.type){
        case 'GET_USERDATA':
            return action.payload;
        default:
            return state
    }
};
