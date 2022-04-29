import { CREATE_POST, CREATE_POST_REQUEST, DELETE_POST, FETCH_POSTS, FETCH_POSTS_REQUEST, LIKE_UNLIKE_POST, REST_POSTS } from "../constants/userConstatns"
import { reaplaceItem } from "."


export const feedReducer = (state={ loading: false, posts: []}, action) => {
    switch(action.type){
        case FETCH_POSTS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_POSTS:
            return{
                ...state,
                loading: false,
                posts: [...state.posts, ...action.payload.data],
                
            }
        case CREATE_POST_REQUEST:
            return{
                ...state,
                    loading: true
            }
        case CREATE_POST:
            return{
                ...state, 
                loading: false,
                posts: [action.payload, ...state.posts],
                
            }
        case REST_POSTS:
            return {
                loading: false, posts: [], prev: null, next: null
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((p) => p.id !== action.payload)
            }
        case LIKE_UNLIKE_POST:
            return{
                ...state,
                posts: reaplaceItem(state.posts, action.payload)
            }
            
        default:
            return state
    }
}