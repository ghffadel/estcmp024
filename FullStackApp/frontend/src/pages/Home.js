import React, { useEffect, useState } from 'react'

import axios from 'axios'

export default function Home () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    })
  }, [])

  return (
    <div>
      {
        posts.map((value, key) => {
          return (
            <div className="post">
              <div className="title"> {value.title} </div>
              <div className="body">{value.text}</div>
              <div className="footer">{value.user}</div>
            </div>
          )
        })
      }
    </div>
  )
}
