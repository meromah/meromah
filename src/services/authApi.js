// src/services/authApi.js
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Email Verification
    emailVerification: builder.mutation({
      query: (email) => ({
        url: '/auth/email-verification',
        method: 'POST',
        body: { email },
      }),
    }),

    // 2️⃣ OTP Verification
    otpVerification: builder.mutation({
      query: ({ otp, email }) => ({
        url: '/auth/otp-verification',
        method: 'POST',
        body: { otp, email },
      }),
    }),

    // 3️⃣ Registration
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useEmailVerificationMutation,
  useOtpVerificationMutation,
  useRegisterUserMutation,
} = authApi;
