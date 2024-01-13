import React, { useState } from 'react'
import { useAddCommentMutation } from '../slices/postApiSlice'

const CommentForm = ({ postId, onCommentAdded }) => {
  const [addComment] = useAddCommentMutation()
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newComment = await addComment({ postId, text }).unwrap()
      setText('')
      onCommentAdded(postId, newComment) // Notify parent component
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Write a comment...'
      />
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default CommentForm
