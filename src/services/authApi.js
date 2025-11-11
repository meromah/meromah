import { setIsAuthenticated } from "../app/authSlice";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    emailVerification: builder.mutation({
      query: (email) => ({
        url: "/auth/email-verification",
        method: "POST",
        body: { email },
      }),
    }),

    otpVerification: builder.mutation({
      query: ({ otp, email }) => ({
        url: "/auth/otp-verification",
        method: "POST",
        body: { otp, email },
      }),
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "isAuthenticated", id: "amILoggedIn" }],
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: [{ type: "isAuthenticated", id: "amILoggedIn" }],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setIsAuthenticated(false));
        } catch (err) {
          dispatch(setIsAuthenticated(true));
          console.error("Login failed:", err);
        }
      },
    }),

    // to check if user is logged in or not. But i am thinking to make this private api only
    amILoggedIn: builder.query({
      query: () => ({
        url: "/auth/amILoggedIn",
      }),
      providesTags: [{ type: "isAuthenticated", id: "amILoggedIn" }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useEmailVerificationMutation,
  useOtpVerificationMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useAmILoggedInQuery,
} = authApi;
