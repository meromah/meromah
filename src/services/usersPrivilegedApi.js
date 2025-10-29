import { privateApi } from "./private/privateApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};


const PrivateUserApiPrivileged = privateApi.injectEndpoints({
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
