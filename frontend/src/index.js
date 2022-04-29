import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { applyMiddleware, createStore  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import jwt_decode from 'jwt-decode'

const accessToken = localStorage.getItem('access') ? localStorage.getItem('access'): null
const refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null



let authState = {
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
    authState['access'] = null
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}
const initialState = {
  auth: authState,
}

const middleware = [thunk]
const store = createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



