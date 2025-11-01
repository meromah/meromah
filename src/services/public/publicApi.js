import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// In development, use /api to go through Vite proxy (avoids CORS)
// In production, use the full API URL from environment variable
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || '/api');

// --- Public baseQuery (no token needed, but includes credentials for cookie-based auth)
const publicBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include', // Include credentials to send/receive HTTP-only cookies
});
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: publicBaseQuery,
  endpoints: () => ({}),
});
