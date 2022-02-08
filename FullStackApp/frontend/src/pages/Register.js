import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

export default function Register () {
  const initialValues = {
    username: '',
    password: '',
  }
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required()
  })

  let navigate = useNavigate()

  const onSubmit = (data) => {
    axios.post('https://fullstackapp-api.herokuapp.com/auth', data).then(() => {
      alert('Successfully created account')
      navigate('/login')
    })
  }

  return (
    <div className='registerPage'>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username</label>
          <ErrorMessage name='username' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='username'
          />

          <label>Password</label>
          <ErrorMessage name='password' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='password'
            type='password'
          />

          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}