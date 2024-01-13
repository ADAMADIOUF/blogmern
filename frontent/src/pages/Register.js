import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
const Register = () => {
 const[name,setName]=useState("")
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [secret, setSecret] = useState('')

const navigate = useNavigate()
const dispatch = useDispatch()
const [register, { isLoading }] = useRegisterMutation()
const { userInfo } = useSelector((state) => state.auth)
const { search } = useLocation()
const sp = new URLSearchParams(search)
const redirect = sp.get(`redirect`) || '/'
useEffect(() => {
  if (userInfo) {
    navigate(redirect)
  }
}, [userInfo, redirect, navigate])
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await register({name,secret, email, password }).unwrap()
    dispatch(setCredentials({ ...res }))
    navigate(redirect)
    toast.success('Register success')
  } catch (error) {
    console.error(error)
    toast.error('Register failed. Please check your credentials.')
  }
}


  return (
    <Container className='register'>
      <h1>Register</h1>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className='register-container'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Pick a question</Form.Label>
              <Form.Select>
                <option>What is your favorite color?</option>
                <option>What is your best friend's name?</option>
                <option>In what city were you born?</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Write your answer here'
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='btn-block '>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
