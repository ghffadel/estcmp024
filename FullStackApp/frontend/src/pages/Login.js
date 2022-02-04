import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate()

  const login = () => {
    const data = {
      username: username,
      password: password
    }

    axios.post('http://localhost:3001/auth/login', data).then((res) => {
      if (res.data.error) {
        alert(res.data.error)
      }

      else {
        sessionStorage.setItem('accessToken', res.data)
        navigate('/')
      }
    })
  }

  return (
    <div className='loginContainer'>
      <input 
        type='text'
        placeholder='Username'
        onChange={(event) => {
          setUsername(event.target.value)
        }} 
      />
      
      <input 
        type='password'
        placeholder='Password'
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
      
      <button onClick={login}>Login</button>
    </div>
  )
}