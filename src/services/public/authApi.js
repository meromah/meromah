import { setCredentials } from '../../app/authSlice';
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
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
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
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
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
  useAmILoggedInQuery,
} = authApi;
