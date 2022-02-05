import React from 'react'
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

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth', data).then(() => {
      console.log(data)
    })
  }

  return (
    <div>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username:</label>
          <ErrorMessage name='user' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='username'
            placeholder='The username goes here...'
          />

          <label>Password:</label>
          <ErrorMessage name='password' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='password'
            placeholder='The password goes here...'
            type='password'
          />

          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}