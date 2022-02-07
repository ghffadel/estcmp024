import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import { AuthContext } from '../helpers/AuthContext'

export default function CreatePost () {
  const initialValues = {
    title: '',
    text: ''
  }
  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, []) 

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
  })

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3001/posts', {...data, UserId: authState.id}, {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
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
          <label>Title</label>
          <ErrorMessage name='title' component='span' />
          <Field
            autoComplete='off'
            id='inputCreatePost'
            name='title'
          />

          <label>Text</label>
          <ErrorMessage name='text' component='span' />
          <Field 
            autoComplete='off'
            id='inputCreatePost'
            name='text'
          />

          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}