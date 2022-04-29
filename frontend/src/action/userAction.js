import { FETCH_POSTS, CREATE_POST, DELETE_POST, REST_POSTS, FOLLOWING, LIKE_UNLIKE_POST, CREATE_POST_REQUEST, FETCH_POSTS_REQUEST } from "../constants/userConstatns"
import * as api from '../services/authService'



export const fetchPost  = () => async  (dispatch) => {
    try {
        dispatch({ type: FETCH_POSTS_REQUEST })
        const  data  = await api.fetchPosts()
        dispatch({ type: FETCH_POSTS, payload: data })
    } catch (error) {
        console.log(error);
    }
}
export const restPost = () => async (dispatch) => {
    dispatch({ type: REST_POSTS})
}
export const createPost = (content) => async (dispatch) => {

    try {

        dispatch({ type: CREATE_POST_REQUEST })
        const { data } = await api.createPost(content)
       dispatch({ type: CREATE_POST, payload: data })
        
       
    } catch (error) {
        console.log(error);
    }
}

export const deltePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(postId)
        dispatch({ type: DELETE_POST, payload: postId })
        
    } catch (error) {
        
    }
}

export const following = () => async (dispatch) => {
    try {
        const { data } = await api.following()
        dispatch({ type: FOLLOWING, data })
    } catch (error) {
        console.log(error);
    }
}

export const like_unlike_post = (likeData) => async (dispatch) => {
    try{
        const { data } = await api.like_unlike_post(likeData)
        dispatch({ type: LIKE_UNLIKE_POST, payload: data })
    }catch(error){
        console.log(error);
    }
}