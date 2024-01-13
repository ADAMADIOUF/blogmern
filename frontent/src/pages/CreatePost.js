import React, { useState } from 'react'
import { useAddPostMutation, useUploadPostImageMutation } from '../slices/postApiSlice'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

const CreatePost = () => {
  const [addPost] = useAddPostMutation()
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
const [uploadProductImage, { isLoading: loadingUpload }] =
  useUploadPostImageMutation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addPost({ content, image }).unwrap()
      setContent('')
      setImage('')
      // Handle success (e.g., showing a success message or redirecting)
    } catch (error) {
      // Handle error (e.g., showing an error message)
    }
  }
const uploadFileHandler = async (e) => {
  const formData = new FormData()
  formData.append('image', e.target.files[0])
  try {
    const res = await uploadProductImage(formData).unwrap()
    toast.success(res.message)
    setImage(res.image)
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <div className='my-2'>
          <label>Image</label>
          <input
            type='text'
            placeholder="Entrez l'URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type='file'
            label='Choisir un fichier'
            onChange={uploadFileHandler}
          />
        </div>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as='textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      
      <Button variant='primary' type='submit'>
        Create Post
      </Button>
    </Form>
  )
}

export default CreatePost
