// ResetPassword.js
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../slices/usersApiSlice'

const ResetPassword = () => {
  const { token } = useParams() // Get the token from the URL
  const [password, setPassword] = useState('')
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword({ token, password })
    // Handle response, show notification, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit' disabled={isLoading}>
        Reset Password
      </button>
    </form>
  )
}

export default ResetPassword
