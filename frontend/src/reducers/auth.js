import { LOGIN } from "../constants/authConstants";

export default function authReducer(state={}, action) {
    
    switch (action.type){
        case LOGIN:
            localStorage.setItem('access', action.data.access)
            localStorage.setItem('refresh', action.data.refresh)
            return{
                ...state,
                access: action.data.access,
                refresh: action.data.refresh,
                isAuthenticated: true,
                isLoading: false,
                user: action.data,
            }
        default:
            return state;
    }
}