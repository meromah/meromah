import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};


const PublicUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get any user profile and display it.
        // route: /users/:username
        getUserByUsername: builder.query({
            query: (username) => ({
                url: `/users/${username}`,
            }),
        }),
    }),
});


const PrivateUserApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllUsersPrivileged: builder.query({
        query: ({ queryParams }) => ({
          url: `/users${toQueryString(queryParams)}`,
        }),
      }),
      getUserPrivileged: builder.query({
        query: ({ user }) => ({
          url: `/users/${user}`,
        }),
      }),
      createUserPrivileged: builder.mutation({
        query: ({ bodyData }) => ({
          url: '/users',
          method: "POST",
          body: bodyData,
        }),
      }),
      updateUserPrivileged: builder.mutation({
        query: ({ user, bodyData }) => ({
          url: `/users/${user}`,
          method: 'PUT',
          body: bodyData,
        }),
      }),
      deleteUserPrivileged: builder.mutation({
        query: ({ user }) => ({
          url: `/users/${user}`,
          method: 'DELETE',
        }),
      }),
    }),
});


export const {
  useCreateUserPrivilegedMutation,
  useUpdateUserPrivilegedMutation,
  useDeleteUserPrivilegedMutation,
  useGetUsersPrivilegedQuery,
  useGetUserPrivilegedQuery,
} = PrivateUserApiPrivileged;

export const {
  useGetUserByUsernameQuery,
} = PublicUserApi;
