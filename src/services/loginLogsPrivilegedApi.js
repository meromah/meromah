import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

const PrivateLoginLogsApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /login-log - Get all login logs with filtering (Auth Required)
        getAllLoginLogsPrivileged: builder.query({
            query: ({ queryParams }) => ({
                url: `/login-log${toQueryString(queryParams)}`,
            }),
        }),
        
        // GET /login-log/{loginLog} - Get single login log by ID (Auth Required)
        getLoginLogPrivileged: builder.query({
            query: ({ loginLog }) => ({
                url: `/login-log/${loginLog}`,
            }),
        }),
        
        // DELETE /login-log/{loginLog} - Delete login log by ID (Auth Required)
        deleteLoginLogPrivileged: builder.mutation({
            query: ({ loginLog }) => ({
                url: `/login-log/${loginLog}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllLoginLogsPrivilegedQuery,
    useGetLoginLogPrivilegedQuery,
    useDeleteLoginLogPrivilegedMutation,
} = PrivateLoginLogsApiPrivileged;
