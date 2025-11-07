import { baseApi } from "./baseApi";

/*
This api is not complete yet. It will contain all post related endpoints,
both private and public.
*/

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};


const PrivatePostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyPosts: builder.query({
      query: ( {queryParams} ) => ({
        url: `/posts/my${toQueryString(queryParams)}`,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ board, post, postData }) => ({
        url: `/boards/${board}/posts/${post}`,
        method: "PUT",
        body: postData,
      }),
    }),
    createPost: builder.mutation({
      query: ({ board, postData }) => ({
        url: `/boards/${board}/posts`,
        method: "POST",
        body: postData,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ board, post }) => ({
        url: `/boards/${board}/posts/${post}`,
        method: "DELETE",
      }),
    }),
    togglePostLike: builder.mutation({
      query: ({ board, post }) => ({
        url: `/boards/${board}/posts/${post}/likes`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

const PublicPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostsForBoard: builder.query({
      query: ({ board, queryParams }) =>
        `/boards/${board}/posts${toQueryString(queryParams)}`,
    }),
    getPostFromBoardByPostId: builder.query({
      query: ({ board, postId }) => `/boards/${board}/posts/${postId}`,
    }),
    globalPostSearch: builder.query({
      query: ({ queryParams }) => `/posts${toQueryString(queryParams)}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useTogglePostLikeMutation,
  useGetAllMyPostsQuery,
} = PrivatePostApi;

export const {
  useGetPostsForBoardQuery,
  useGetPostFromBoardByPostIdQuery,
  useGlobalPostSearchQuery,
} = PublicPostApi;
