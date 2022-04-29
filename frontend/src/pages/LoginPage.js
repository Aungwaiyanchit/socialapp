import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '../action/authAction'

export const LoginPage = () => {
    const [formData, setFormData] = useState({
      username: '', password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = localStorage.getItem('access')
    
   
    useEffect(() => {
      if(auth) navigate('/')
    },[auth, navigate])

    const handelsubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData, navigate))
    }
  return (
    <div>
       <p>Login Page</p>
        <form>
            <input type='text' placeholder='Enter your username' onChange={(e) => setFormData({...formData, username: e.target.value})}/>
            <input type='text' placeholder='Enter your password' onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            <br/>
            <button onClick={handelsubmit} >login</button>
        </form>
    </div>
  )
}
