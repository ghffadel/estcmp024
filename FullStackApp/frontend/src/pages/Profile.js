import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Profile () {
  const [username, setUsername] = useState('')
  const [posts, setPosts] = useState([])
  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((res) => {
      setUsername(res.data.username)
    })

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        {' '}
        <h1>User: {username}</h1>
      </div>

      <div className='listOfPosts'>
        {
          posts.map((value, key) => {
            return (
              <div key={key} className='post'>
                <div className='title'>{value.title}</div>

                <div 
                  className='body'
                  onClick={() => {
                    navigate(`/post/${value.id}`)
                  }}
                >
                  {value.text}
                </div>

                <div className='footer'>
                  <div className='username'>{value.user}</div>

                  <div className='buttons'>
                    <label>{value.Likes.length}</label>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
