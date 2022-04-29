import { FOLLOWING } from "../constants/userConstatns";

export default function userReducer(state={}, action) {
    switch(action.type){
        case FOLLOWING:
            return{
                ...state,
                following: action.data
            }
        default:
            return state
    }
}