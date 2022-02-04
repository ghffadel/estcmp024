import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Register from './pages/Register'

import './App.css'

export default function App () {
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
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
    </div>
  )
}