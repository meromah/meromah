import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

const PrivatePermissionsApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /permissions - Get all permissions with filtering (Auth Required)
        getAllPermissionsPrivileged: builder.query({
            query: ({ queryParams }) => ({
                url: `/permissions${toQueryString(queryParams)}`,
            }),
        }),
        
        // GET /permissions/{permission} - Get single permission by ID (Auth Required)
        getPermissionPrivileged: builder.query({
            query: ({ permission }) => ({
                url: `/permissions/${permission}`,
            }),
        }),
        
        // POST /permissions - Create new permission (Auth Required)
        createPermissionPrivileged: builder.mutation({
            query: ({ bodyData }) => ({
                url: '/permissions',
                method: "POST",
                body: bodyData,
            }),
        }),
        
        // PUT /permissions/{permission} - Update permission by ID (Auth Required)
        updatePermissionPrivileged: builder.mutation({
            query: ({ permission, bodyData }) => ({
                url: `/permissions/${permission}`,
                method: 'PUT',
                body: bodyData,
            }),
        }),
        
        // DELETE /permissions/{permission} - Delete permission by ID (Auth Required)
        deletePermissionPrivileged: builder.mutation({
            query: ({ permission }) => ({
                url: `/permissions/${permission}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllPermissionsPrivilegedQuery,
    useGetPermissionPrivilegedQuery,
    useCreatePermissionPrivilegedMutation,
    useUpdatePermissionPrivilegedMutation,
    useDeletePermissionPrivilegedMutation,
} = PrivatePermissionsApiPrivileged;
