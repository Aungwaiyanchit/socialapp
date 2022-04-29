import axios from 'axios'

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api/'})



API.interceptors.request.use((req) => {

    if(localStorage.getItem('access')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    }
    return req
})

export const fetchPosts = () => API.get(`posts/`)
export const createPost = (formData) => API.post('posts/create/', formData)
export const deletePost = (postId) => API.delete(`posts/delete/${postId}/`)
export const like_unlike_post = (likeData) => API.post('posts/like/', likeData)
 export const login = (formData) => API.post('users/login/', formData)


export const following = () => API.get('users/following/')
