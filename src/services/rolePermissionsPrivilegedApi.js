import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

const PrivateRolePermissionsApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /role-permissions - Paginated list with filters (Auth Required)
        getAllRolePermissionsPrivileged: builder.query({
            query: ({ queryParams }) => ({
                url: `/role-permissions${toQueryString(queryParams)}`,
            }),
        }),

        // GET /role-permissions/{rolePermission} - Single record (Auth Required)
        getRolePermissionPrivileged: builder.query({
            query: ({ rolePermission }) => ({
                url: `/role-permissions/${rolePermission}`,
            }),
        }),

        // POST /role-permissions - Create (Auth Required)
        createRolePermissionPrivileged: builder.mutation({
            query: ({ bodyData }) => ({
                url: '/role-permissions',
                method: "POST",
                body: bodyData,
            }),
        }),

        // PUT /role-permissions/{rolePermission} - Update (Auth Required)
        updateRolePermissionPrivileged: builder.mutation({
            query: ({ rolePermission, bodyData }) => ({
                url: `/role-permissions/${rolePermission}`,
                method: 'PUT',
                body: bodyData,
            }),
        }),

        // DELETE /role-permissions/{rolePermission} - Delete (Auth Required)
        deleteRolePermissionPrivileged: builder.mutation({
            query: ({ rolePermission }) => ({
                url: `/role-permissions/${rolePermission}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllRolePermissionsPrivilegedQuery,
    useGetRolePermissionPrivilegedQuery,
    useCreateRolePermissionPrivilegedMutation,
    useUpdateRolePermissionPrivilegedMutation,
    useDeleteRolePermissionPrivilegedMutation,
} = PrivateRolePermissionsApiPrivileged;


