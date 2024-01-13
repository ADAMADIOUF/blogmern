import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
const[login,{isLoading}]=useLoginMutation()
const {userInfo} = useSelector((state =>state.auth))
const {search} = useLocation()
const sp = new URLSearchParams(search)
const redirect = sp.get(`redirect`) || "/"
useEffect(()=>{
  if(userInfo){
    navigate(redirect)
  }
},[userInfo,redirect,navigate])
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await login({email,password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
      toast.success('Login success')
    } catch (error) {
      console.error(error)
      toast.error('Login failed. Please check your credentials.')
      
    }
  }

  return (
    <Container className='login'>
      <h1>Login</h1>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className='login-container'>
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='btn-block'
              disabled={isLoading}
            >
              Login
            </Button>
            <div className='mt-3'>
              <Link to='/forgotpassword'>Forgot Password?</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
