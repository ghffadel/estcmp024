import React, { useState } from 'react'
import axios from 'axios'

export default function ChangePassword () {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const changePassword = () => {
    axios
      .put('http://localhost:3001/auth/changepassword', {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error)
        }
      })
  }

  return (
    <div>
      <h1>Change Your Password</h1>

      <input
        type='text'
        placeholder='Old password...'
        onChange={(event) => {
          setOldPassword(event.target.value)
        }}
      />

      <input
        type='text'
        placeholder='New password...'
        onChange={(event) => {
          setNewPassword(event.target.value)
        }}
      />

      <button onClick={changePassword}>Save Changes</button>
    </div>
  )
}
