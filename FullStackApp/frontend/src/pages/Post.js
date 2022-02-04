import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

export default function Post () {
  let { id } = useParams()
  const [postData, setPostData] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPostData(res.data)
    })
  }, [])

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{postData.title}</div>
          <div className='body'>{postData.text}</div>
          <div className='footer'>{postData.user}</div>
        </div>
      </div>

      <div className='rightSide'>Comment Section</div>
    </div>
  )
}
