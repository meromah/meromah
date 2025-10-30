import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from '../../app/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const privateBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token; // <-- dynamic getState
    console.log(`Attaching access token to headers:`, token);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const privateBaseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await privateBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refresh_token = localStorage.getItem('refresh_token');
    console.log(`Refresh token retrieved from localStorage:`, refresh_token);
    if (!refresh_token) {
      api.dispatch(clearCredentials());
      return result;
    }

    const refreshResult = await privateBaseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refresh_token },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await privateBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }
  console.log("Private API Result:", result);
  return result;
};



export const privateApi = createApi({
  reducerPath: 'privateApi',
  baseQuery: privateBaseQueryWithReauth,
  endpoints: () => ({}),
});
