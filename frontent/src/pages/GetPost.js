import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../slices/postApiSlice'
import { FaTrash, FaHeart, FaComment } from 'react-icons/fa'
import { Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import CommentForm from './CommentForm'

const GetPost = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePost(id).unwrap()
        refetch()
        toast.success('Post deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const [likeCounts, setLikeCounts] = useState({})

  useEffect(() => {
    
    if (posts) {
      const initialLikeCounts = posts.reduce((acc, post) => {
        acc[post._id] = post.likes.length 
        return acc
      }, {})
      setLikeCounts(initialLikeCounts)
    }
  }, [posts])

  const handleLikeToggle = async (postId) => {
    const post = posts.find((p) => p._id === postId)
    const alreadyLiked = post.likes.includes(userInfo._id)

    try {
      if (!alreadyLiked) {
        await likePost(postId).unwrap()
        refetch() 
      } else {
        await unlikePost(postId).unwrap()
        refetch() 
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }
const handleDeleteComment = async (postId, commentId) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    try {
      await deleteComment({ postId, commentId }).unwrap()
      refetch()
      toast.success('Comment deleted')
    } catch (error) {
      toast.error('Error deleting comment')
    }
  }
}
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Card className='my-3 p-3 rounded'>
      <h1>Posts</h1>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className='mb-4'>
            <h3>{post.user.name}</h3>
            <p>{post.content}</p>
            {post.image && (
              <div>
                <img
                  src={post.image}
                  alt='Post'
                  className='img-fluid post-image'
                />
                <div className='likes'>
                  <span onClick={() => handleLikeToggle(post._id)}>
                    <FaHeart style={{ cursor: 'pointer' }} />
                    {likeCounts[post._id]}
                    likes
                  </span>
                </div>
                {post.comments.map((comment) => (
                  <div key={comment._id} className='comment-section'>
                    <strong>{comment.user?.name}: </strong>{' '}
                    <span>
                      <FaComment /> {comment.text}
                    </span>
                    <div>
                      <small>
                        Commented on:{' '}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </small>
                      {userInfo && userInfo._id === comment.user._id && (
                        <FaTrash
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() =>
                            handleDeleteComment(post._id, comment._id)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
                <CommentForm postId={post._id} />
              </div>
            )}
            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            {userInfo && userInfo._id === post.user._id && (
              <Button
                variant='danger'
                className='btn-sm'
                onClick={() => deleteHandler(post._id)}
                disabled={loadingDelete}
              >
                <FaTrash />
              </Button>
            )}
          </div>
        ))}
        
    </Card>
  )
}

export default GetPost
