import { baseApi } from "./baseApi";

const PublicUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByUsername: builder.query({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
  }),
});

const PrivateUserSelfApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // main details related e.g. name, email, username
    getMe: builder.query({
      query: () => "/me",
    }),
    updateMe: builder.mutation({
      query: ({ bodyData }) => ({
        url: "/me",
        method: "PUT",
        body: bodyData,
      }),
    }),

    //profile related e.g. bio, birthday, socials
    getMyProfile: builder.query({
      query: () => "/me/profile",
    }),
    // updateMyProfile will create a new profile if it doesn't exist yet
    updateMyProfile: builder.mutation({
      query: ({ bodyData }) => ({
        url: "/me/profile/updateSelf",
        method: "POST",
        body: bodyData,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,

  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = PrivateUserSelfApi;

export const { 
  useGetUserByUsernameQuery,
} = PublicUserApi;
