import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

import { AuthContext } from '../helpers/AuthContext'

export default function Profile () {
  const [username, setUsername] = useState('')
  const [posts, setPosts] = useState([])
  const { authState } = useContext(AuthContext)
  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://fullstackapp-api.herokuapp.com/auth/basicinfo/${id}`).then((res) => {
      setUsername(res.data.username)
    })

    axios.get(`https://fullstackapp-api.herokuapp.com/posts/byUserId/${id}`).then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        {' '}
        <h1>{username + `'s posts`}</h1>
        {
          authState.username === username && (
            <button
              onClick={() => {
                navigate('/changepassword')
              }}
            >
              {' '} Change My Password
            </button>
          )
        }
      </div>

      <div>
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
                    <ThumbUpAltIcon className='likeBttn' />
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
