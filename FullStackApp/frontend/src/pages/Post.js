import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import { AuthContext } from '../helpers/AuthContext'

export default function Post () {
  let { id } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [postData, setPostData] = useState({})
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPostData(res.data)
    })

    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data)
    })
  }, [])

  const addComment = () => {
    axios
      .post('http://localhost:3001/comments', { 
        text: newComment, 
        PostId: id 
      }, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        console.log(res.data)

        if (res.data.error) {
          console.log(res.data.error)
        }

        else {
          setComments([...comments, { 
            text: newComment,
            user: res.data.user
          }])
          setNewComment('')
        }
      })
  }

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id
          })
        )
      })
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{postData.title}</div>
          <div className='body'>{postData.text}</div>
          <div className='footer'>{postData.user}</div>
        </div>
      </div>

      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input 
            type='text' 
            placeholder='Comment...' 
            autoComplete='off' 
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value)
            }} 
          />
          <button onClick={addComment}>Add comment</button>
        </div>

        <div className='listOfComments'>
          {
            comments.map((comment, key) => {
              return (
                <div className='comment' key={key}>
                  {comment.text}
                  <label>User: {comment.user}</label>
                  {
                    authState.username === comment.user && (
                      <button onClick={() => {deleteComment(comment.id)}}>X</button>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
