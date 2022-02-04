import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

export default function CreatePost () {
  const initialValues = {
    title: '',
    text: '',
    user: ''
  }
  
  let navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
    user: Yup.string().min(3).max(15).required()
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/posts', data).then((res) => {
      navigate('/')
    })
  }

  return (
    <div className='createPostPage'>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Title:</label>
          <ErrorMessage name='title' component='span' />
          <Field
            autoComplete='off'
            id='inputCreatePost'
            name='title'
            placeholder='The title goes here...'
          />

          <label>Text:</label>
          <ErrorMessage name='text' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='text'
            placeholder='The text goes here...'
          />

          <label>User:</label>
          <ErrorMessage name='user' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='user'
            placeholder='The username goes here...'
          />

          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}