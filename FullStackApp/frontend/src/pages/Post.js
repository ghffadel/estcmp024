import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

export default function Post () {
  let { id } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [postData, setPostData] = useState({})

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
      })
      .then((res) => {
        setComments([...comments, { text: newComment }])
        setNewComment('')
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
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
