// postApiSlice.js
import { UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const POSTS_URL = '/api/posts'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `${POSTS_URL}`,
    }),
    getPostById: builder.query({
      query: (id) => `${POSTS_URL}/${id}`,
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}/like`,
        method: 'PUT',
      }),
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}/unlike`,
        method: 'PUT',
      }),
    }),
    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: `${POSTS_URL}/${postId}/comments`,
        method: 'POST',
        body: { text },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `${POSTS_URL}/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadPostImageMutation,
  useLikePostMutation,
  useUnlikePostMutation,useAddCommentMutation,useDeleteCommentMutation
} = postsApiSlice
