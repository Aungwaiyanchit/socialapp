import { createStore, appliMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import jwt_decode from 'jwt-decode'


const accessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null
const refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null

const authState = {
    access: accessToken,
    refresh: refreshToken,
    isAuthenticated: false,
    user: null
}

if(accessToken){
    try {
        authState['user'] = jwt_decode(accessToken)
        authState['isAuthenticated'] = true
    } catch (error) {
        authState['access'] = null;
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
}

const initialState = {
    auth: authState,
}

const middleWare = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    appliMiddleware(...middleWare)
)

export default store