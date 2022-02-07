import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'

import { AuthContext } from '../helpers/AuthContext'

export default function Post () {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [postData, setPostData] = useState({})
  const { authState } = useContext(AuthContext)
  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byPostId/${id}`).then((res) => {
      setPostData(res.data)
    })

    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data)
    })
  }, [])

  const addComment = () => {
    if (newComment.length > 0) {
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
          if (res.data.error) {
            alert(res.data.error)
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

      else {
        alert('Comment cannot be empty')
      }
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

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`,{
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(() => {
        navigate('/')
      })
  }

  const editPost = (option) => {
    if (option === 'title') {
      let newTitle = prompt('Enter new title:')

      if (newTitle.length > 0) {
        axios.put('http://localhost:3001/posts/title', {
          newTitle: newTitle,
          id: id
        }, {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        })
        setPostData({...postData, title: newTitle})
      }

      else {
        alert('Title cannot be empty')
      }
    }

    else {
      let newText = prompt('Enter new text:')

      if (newText.length > 0) {
        axios.put('http://localhost:3001/posts/text', {
          newText: newText,
          id: id
        }, {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        })
        setPostData({...postData, text: newText})
      }

      else {
        alert('Text cannot be empty')
      }
    }
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div 
            className='title'
            onClick={() => {
              if (authState.username === postData.user) {
                editPost('title')
              }
            }}
          >
            {postData.title}
          </div>
          <div 
            className='body'
            onClick={() => {
              if (authState.username === postData.user) {
                editPost('text')
              }
            }}
          >
            {postData.text}
          </div>
          <div className='footer'>
            {postData.user}
            <div className='buttons'>
              {
                authState.username === postData.user && (
                  <DeleteIcon
                    onClick={() => {
                      deletePost(postData.id)
                    }}
                  />
                )
              }
            </div>
          </div>
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
                  <p>{comment.text}</p>
                  <div className='commentFooter'>
                    <label> {comment.user}</label>
                    <div className='buttons'>
                      {
                        authState.username === comment.user && (
                          <DeleteIcon
                            onClick={() => {
                              deleteComment(comment.id)
                            }}
                          />                      
                        )
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
