import { publicApi } from './public/publicApi';
import { privateApi } from './private/privateApi';

const toQueryString = ( params ) => {
  if (!params || Object.keys(params).length === 0 ) {
    return '';
  }
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateCommentOfBoardPostApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyComments: builder.query({
      query: (queryParams) => ({
        url: `/comments${toQueryString(queryParams)}`,
        method: "GET",
      }),
    }),
  }),
});

const PublicCommentOfBoardPostApi = publicApi.injectEndpoints({
  endpoints: ( builder ) => ({
    getCommentsByBoardPost: builder.query({
      query:  ({ board, post, queryParams }) => ({
        url: `/boards/${board}/posts/${post}${toQueryString(queryParams)}`,
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
  useGetCommentLikesByCommentIdMutation,
  useToggleCommentLikesByCommentIdMutation,
} = PublicCommentOfBoardPostApi;

export const {
  useGetAllMyCommentsQuery,
} = PrivateCommentOfBoardPostApi;
