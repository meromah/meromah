import { setIsAuthenticated } from '../../app/authSlice';
import { publicApi } from './publicApi';

export const authApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    emailVerification: builder.mutation({
      query: (email) => ({
        url: '/auth/email-verification',
        method: 'POST',
        body: { email },
      }),
    }),

    otpVerification: builder.mutation({
      query: ({ otp, email }) => ({
        url: '/auth/otp-verification',
        method: 'POST',
        body: { otp, email },
      }),
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Server sets HTTP-only cookies - no tokens needed
          // Dispatch empty credentials to mark as authenticated
          dispatch(setIsAuthenticated(true));
        } catch (err) {
          dispatch(setIsAuthenticated(false));
          console.error('Registration failed:', err);
        }
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Server sets HTTP-only cookies - no tokens needed
          // Dispatch empty credentials to mark as authenticated
          dispatch(setIsAuthenticated(true));
        } catch (err) {
          dispatch(setIsAuthenticated(false));
          console.error('Login failed:', err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // to check if user is logged in or not. But i am thinking to make this private api only
    amILoggedIn: builder.query({
      query: () => ({
        url: '/auth/amILoggedIn',
      }),
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