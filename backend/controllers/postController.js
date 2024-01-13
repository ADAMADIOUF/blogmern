import asyncHandler from '../middleware/asyncHandler.js'
import Post from '../models/PostModel.js'

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body

  const post = new Post({
    user: req.user._id, // Assuming req.user is populated from a middleware
    content,
    image,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name') // Populating the post's user
    .populate({
      path: 'comments.user',
      select: 'name', // Populating the user's name in each comment
    })
  res.json(posts)
})


// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const { content, image } = req.body
  const post = await Post.findById(req.params.id)

  if (post && post.user.equals(req.user._id)) {
    post.content = content
    post.image = image
    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found or user not authorized')
  }
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id

  // Find the post by ID
  const post = await Post.findById(postId)
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }

  // Check if the logged-in user is the one who created the post
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized to delete this post')
  }

  // Attempt to delete the post
  try {
    await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: 'Post deleted' })
  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ message: 'Error deleting post' })
  }
})
// controllers/postController.js

// Function to like a post
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if the post has already been liked by this user
  if (post.likes.includes(req.user._id)) {
    res.status(400);
    throw new Error('You have already liked this post');
  }

  post.likes.push(req.user._id);
  await post.save();

  res.status(200).json({ message: 'Post liked' });
});

// Function to unlike a post
const unlikePost = asyncHandler(async (req, res) => {
  console.log(`Unliking post with ID: ${req.params.id}`)
  const post = await Post.findById(req.params.id)

  if (!post) {
    console.log('Post not found')
    res.status(404)
    throw new Error('Post not found')
  }

  console.log(`Original likes: ${post.likes}`)
  post.likes = post.likes.filter(
    (like) => like.toString() !== req.user._id.toString()
  )
  console.log(`Updated likes: ${post.likes}`)

  await post.save()

  res.status(200).json({ message: 'Post unliked' })
})
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }

  const comment = {
    user: req.user._id, // Assuming req.user is populated from the auth middleware
    text: req.body.text,
    createdAt: new Date(),
  }

  post.comments.push(comment)
  await post.save()

  res.status(201).json(comment)
})

const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }

  // Find the comment in the post
  const comment = post.comments.find(
    (c) => c._id.toString() === req.params.commentId
  )

  // Check if comment exists
  if (!comment) {
    res.status(404)
    throw new Error('Comment not found')
  }

  // Check if the logged-in user is the one who made the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Remove the comment from the post
  post.comments = post.comments.filter(
    (c) => c._id.toString() !== req.params.commentId
  )

  await post.save()
  res.status(200).json({ message: 'Comment deleted' })
})

export { createPost, getPosts, updatePost, deletePost, likePost, unlikePost,addComment,deleteComment }
