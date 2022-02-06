import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function Home () {
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    })
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
                {value.postText}
              </div>

              <div className='footer'>
                {value.username}{' '}
                <button
                  onClick={() => {
                    like(value.id);
                  }}
                >
                  {" "} Like
                </button>
                <label> {value.Likes.length}</label>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
