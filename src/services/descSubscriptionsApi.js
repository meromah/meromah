import { privateApi } from "./private/privateApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateDescSubscriptionsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /desc/{desc}/subscribe - Subscribe to a desc
    subscribeToDesc: builder.mutation({
      query: ({ desc }) => ({
        url: `/desc/${desc}/subscribe`,
        method: "POST",
      }),
    }),

    // DELETE /desc/{desc}/subscribe - Unsubscribe from a desc
    unsubscribeFromDesc: builder.mutation({
      query: ({ desc }) => ({
        url: `/desc/${desc}/subscribe`,
        method: "DELETE",
      }),
    }),

    // GET /desc/{desc}/subscribers - Author-only list
    getDescSubscribersPrivileged: builder.query({
      query: ({ desc }) => ({
        url: `/desc/${desc}/subscribers`,
      }),
    }),

    // GET /desc-subscriptions/all - Admin list with filters
    getAllDescSubscriptionsPrivileged: builder.query({
      query: ({ queryParams }) => ({
        url: `/desc-subscriptions/all${toQueryString(queryParams)}`,
      }),
    }),

    // GET /desc-subscriptions/{descSubscription} - Admin detail
    getDescSubscriptionPrivileged: builder.query({
      query: ({ descSubscription }) => ({
        url: `/desc-subscriptions/${descSubscription}`,
      }),
    }),

    // POST /desc-subscriptions - Admin create
    createDescSubscriptionPrivileged: builder.mutation({
      query: ({ bodyData }) => ({
        url: `/desc-subscriptions`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // GET /me/desc-subscriptions - Current user's desc subscriptions
    getMyDescSubscriptions: builder.query({
      query: () => ({
        url: `/me/desc-subscriptions`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubscribeToDescMutation,
  useUnsubscribeFromDescMutation,
  useGetDescSubscribersPrivilegedQuery,
  useGetAllDescSubscriptionsPrivilegedQuery,
  useGetDescSubscriptionPrivilegedQuery,
  useCreateDescSubscriptionPrivilegedMutation,
  useGetMyDescSubscriptionsQuery,
} = PrivateDescSubscriptionsApi;


