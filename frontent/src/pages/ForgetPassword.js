// ForgotPassword.js
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '../slices/usersApiSlice'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await forgotPassword({ email })
    // Handle response, show notification, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type='submit' disabled={isLoading}>
        Submit
      </button>
    </form>
  )
}

export default ForgotPassword
