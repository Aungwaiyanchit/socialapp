import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { fetchPost, following } from './action/userAction'

import { PrivateRoute } from './utils/PrivateRoute'


 const App = () => { 

      const dispatch = useDispatch()
      useEffect(() => {
        dispatch(fetchPost())        
      }, [dispatch])

      
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App