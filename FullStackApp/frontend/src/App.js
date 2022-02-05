import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import axios from 'axios'

import { AuthContext } from './helpers/AuthContext'

import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Register from './pages/Register'

import './App.css'

export default function App () {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState(false);
        }

        else {
          setAuthState(true);
        }
      })
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            {
            !authState && (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}
            <Link to='/'>Home Page</Link>
            <Link to='/create-post'>Create a Post</Link>
          </div>
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}