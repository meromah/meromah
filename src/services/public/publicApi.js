import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
