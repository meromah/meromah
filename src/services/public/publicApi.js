import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Public baseQuery (no token needed)
const publicBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: publicBaseQuery,
  endpoints: () => ({}),
});
