import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import axios from 'axios'

import { AuthContext } from './helpers/AuthContext'

import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Register from './pages/Register'

import './App.css'

export default function App () {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  })

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({...authState, status: false});
        }

        else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true
          });
        }
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')

    setAuthState({ 
      username: '', 
      id: 0, 
      status: false 
    })
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <div className='loggedInContainer'>
              <h1>{authState.username}</h1>
              { authState.status && <button onClick={logout}>Logout</button> }
            </div>

            <div className='links'>
              { 
                !authState.status ? (
                  <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                  </>
                ) : (
                  <>
                    <Link to='/'>Home Page</Link>
                    <Link to='/create-post'>Create a Post</Link>
                  </>
                )
              }
              
            </div>
          </div>
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}