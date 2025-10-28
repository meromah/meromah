import { privateApi } from "./private/privateApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};


const PrivateUserApiForAdmin = privateApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllUsersAsAdmin: builder.query({
        query: ({ queryParams }) => ({
          url: `/users${toQueryString(queryParams)}`,
        }),
      }),
      getUserAsAdmin: builder.query({
        query: ({ user }) => ({
          url: `/users/${user}`,
        }),
      }),
      createUserAsAdmin: builder.mutation({
        query: ({ bodyData }) => ({
          url: '/users',
          method: "POST",
          body: bodyData,
        }),
      }),
      updateUserAsAdmin: builder.mutation({
        query: ({ user, bodyData }) => ({
          url: `/users/${user}`,
          method: 'PUT',
          body: bodyData,
        }),
      }),
      deleteUserAsAdmin: builder.mutation({
        query: ({ user }) => ({
          url: `/users/${user}`,
          method: 'DELETE',
        }),
      }),
    }),
});


export const {
  useCreateUserAsAdminMutation,
  useUpdateUserAsAdminMutation,
  useDeleteUserAsAdminMutation,
  useGetUsersAsAdminQuery,
  useGetUserAsAdminQuery,
} = PrivateUserApiForAdmin;
