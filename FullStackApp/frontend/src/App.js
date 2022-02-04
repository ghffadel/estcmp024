import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Post from './pages/Post'

import './App.css'

export default function App () {
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to='/create-post'>Create a Post</Link>
          <Link to='/'>Home Page</Link>
        </div>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<Post />} />
        </Routes>
      </Router>
    </div>
  )
}