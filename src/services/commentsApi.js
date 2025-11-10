import { toQueryString } from '../utils/helpers';
import { baseApi } from './baseApi';

const commentsApi = baseApi.injectEndpoints({
  endpoints: ( builder ) => ({
    getUserComment: builder.query({
      query:  ({username}) => ({
        url: `/users/${username}/comments`,
        method: 'GET'
      }),
    }),
    endpoints: (builder) => ({
    getAllMyComments: builder.query({
      query: (queryParams) => ({
        url: `/comments/my${toQueryString(queryParams)}`,
        method: "GET",
      }),
    }),
  }),
    getCommentsByBoardPost: builder.query({
      query:  ({ board, postId, queryParams }) => ({
        url: `/boards/${board}/posts/${postId}/comments${toQueryString(queryParams)}`,
        method: 'GET'
      }),
    }),
    getCommentByBoardPostCommentId: builder.query({
      query: ({ board, post, comment }) => ({
        url: `/boards/${board}/posts/${post}/comments/${comment}`,
        method: "GET",
      }),
    }),
    createCommentByBoardPost: builder.mutation({
      query: ({ board, post, bodyData }) => ({
        url: `/boards/${board}/posts/${post}/comments`,
        method: "POST",
        body: bodyData,
      }),
    }),
    updateCommentByBoardPost: builder.mutation({
      query: ({ board, post, comment, bodyData }) => ({
        url: `/boards/${board}/posts/${post}/comments/${comment}`,
        method: "PUT",
        body: bodyData,
      }),
    }),
    deleteCommentByBoardPost: builder.mutation({
      query: ({ board, post, comment }) => ({
        url: `/boards/${board}/posts/${post}/comments/${comment}`,
        method: "DELETE"
      }),
    }),
    getCommentLikesByCommentId: builder.query({
      query: ({ comment }) => ({
        url: `/comments/${comment}/likes`,
      }),
    }),
    toggleCommentLikeByCommentId: builder.mutation({
      query: ({ comment }) => ({
        url: `/comments/${comment}/likes`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCommentsByBoardPostQuery,
  useGetCommentByBoardPostCommentIdQuery,
  useCreateCommentByBoardPostMutation,
  useUpdateCommentByBoardPostMutation,
  useDeleteCommentByBoardPostMutation,
  useGetUserCommentQuery,
  useGetCommentLikesByCommentIdMutation,
  useToggleCommentLikesByCommentIdMutation,
  useGetAllMyCommentsQuery,
} = commentsApi;