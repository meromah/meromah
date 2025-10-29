import { privateApi } from './private/privateApi';

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  return `?${new URLSearchParams(params).toString()}`;
};

// This API service is for retrieving a user's (users') progress logs (what tests they have solved so far, what were those scores).
// getMyTestProgressLogsApi -> fetches the current user's progress statistics on autopilot -> but the user must be authenticated
// getAllTestProgressLogsAsAdminApi -> must be run as an admin in admin panel, this fetches all users, and all their test-solving statistics.
const privateTestProgressLogsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTestProgressLogsApi: builder.query({
      query: ({ params }) => `/test-progress-log/me${toQueryString(params)}`,
    }),
    getAllTestProgressLogsPrivilegedApi: builder.query({
      query: ({ params }) => `/test-progress-logs${toQueryString(params)}`,
    }),
  }),
});


export const {
  useGetMyTestProgressLogsApiQuery,
  useGetAllTestProgressLogsPrivilegedApiQuery,
} = privateTestProgressLogsApi;