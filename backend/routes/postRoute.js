import express from 'express'
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  unlikePost,
  likePost,
  addComment,
  deleteComment,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js' // Assuming you have an auth middleware

const router = express.Router()

router.route('/').post(protect, createPost).get(getPosts)
router.route('/:id').put(protect, updatePost).delete(protect, deletePost)
router.put('/:id/like', protect, likePost)

// Unlike a post
router.put('/:id/unlike', protect, unlikePost)
router.post('/:id/comments', protect, addComment)
router.delete('/:id/comments/:commentId', protect, deleteComment)

export default router
