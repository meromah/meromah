import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// In development, use /api to go through Vite proxy (avoids CORS)
// In production, use the full API URL from environment variable
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || '/api');

// base api - uses HTTP-only cookies for authentication
const baseBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include', // Include cookies (HTTP-only) in every request
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseBaseQuery,
  tagTypes: ['Comments', 'Post', 'isAuthenticated'], 
  endpoints: () => ({}),
});
