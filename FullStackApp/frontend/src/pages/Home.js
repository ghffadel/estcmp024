import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

import { AuthContext } from '../helpers/AuthContext'

export default function Home () {
  const [posts, setPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }

    else {
      axios
        .get('http://localhost:3001/posts', {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        })
        .then((res) => {
          setPosts(res.data.posts)
          setLikedPosts(res.data.likedPosts.map((like) => {
            return like.PostId
          }))
        })
    }
  }, [])

  const like = (postId) => {
    axios
      .post(
        'http://localhost:3001/likes',
        { 
          PostId: postId 
        },
        { 
          headers: { 
            accessToken: localStorage.getItem('accessToken') 
          } 
        }
      )
      .then((res) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } 
              
              else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } 
            
            else {
              return post;
            }
          })
        )

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => {
            return id !== postId
          }))
        }

        else {
          setLikedPosts([...likedPosts, postId])
        }
      })
  }

  return (
    <div>
      {
        posts.map((value, key) => {
          return (
            <div key={key} className='post'>
              <div className='title'> {value.title} </div>

              <div 
                className='body'
                onClick={() => {
                  navigate(`/post/${value.id}`)
                }}
              >
                {value.text}
              </div>

              <div className='footer'>
                <div className='username'>
                  <Link to={`/profile/${value.UserId}`}>{value.user}</Link>
                </div>
                <div className='buttons'>
                  <ThumbUpAltIcon 
                    onClick={() => {
                      like(value.id)
                    }}
                    className={
                      likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'
                    }
                  />

                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
