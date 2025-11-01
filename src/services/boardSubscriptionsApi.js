import { baseApi } from "./baseApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateBoardSubscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /boards/{board}/subscribe - Subscribe to a board
    subscribeToBoard: builder.mutation({
      query: ({ board }) => ({
        url: `/boards/${board}/subscribe`,
        method: "POST",
      }),
    }),

    // DELETE /boards/{board}/subscribe - Unsubscribe from a board
    unsubscribeFromBoard: builder.mutation({
      query: ({ board }) => ({
        url: `/boards/${board}/subscribe`,
        method: "DELETE",
      }),
    }),

    // GET /boards/{board}/subscribers - Author-only list
    getBoardSubscribersPrivileged: builder.query({
      query: ({ board, queryParams }) => ({
        url: `/boards/${board}/subscribers${toQueryString(queryParams)}`,
      }),
    }),

    // GET /me/board-subscriptions - Current user's subscriptions
    getMyBoardSubscriptions: builder.query({
      query: () => ({
        url: `/me/board-subscriptions`,
      }),
    }),

    // GET /board-subscriptions/all - Admin list with filters
    getAllBoardSubscriptionsPrivileged: builder.query({
      query: ({ queryParams }) => ({
        url: `/board-subscriptions/all${toQueryString(queryParams)}`,
      }),
    }),

    // GET /board-subscriptions/{boardSubscription} - Admin detail
    getBoardSubscriptionPrivileged: builder.query({
      query: ({ boardSubscription }) => ({
        url: `/board-subscriptions/${boardSubscription}`,
      }),
    }),

    // POST /board-subscriptions - Admin create
    createBoardSubscriptionPrivileged: builder.mutation({
      query: ({ bodyData }) => ({
        url: `/board-subscriptions`,
        method: "POST",
        body: bodyData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubscribeToBoardMutation,
  useUnsubscribeFromBoardMutation,
  useGetBoardSubscribersPrivilegedQuery,
  useGetMyBoardSubscriptionsQuery,
  useGetAllBoardSubscriptionsPrivilegedQuery,
  useGetBoardSubscriptionPrivilegedQuery,
  useCreateBoardSubscriptionPrivilegedMutation,
} = PrivateBoardSubscriptionsApi;


