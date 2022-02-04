import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import CreatePost from './pages/CreatePost'
import Home from './pages/Home'

import './App.css'

export default function App () {
  

  return (
    <div className="App">
      <Router>
        <Link to='/create-post'>Create a Post</Link>
        <Link to='/'>Home Page</Link>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  )
}