import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

const PrivateRolesApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /roles - Get all roles with optional filtering
        getAllRolesPrivileged: builder.query({
            query: ({ queryParams }) => ({
                url: `/roles${toQueryString(queryParams)}`,
            }),
        }),
        
        // GET /roles/{role} - Get single role by ID
        getRolePrivileged: builder.query({
            query: ({ role }) => ({
                url: `/roles/${role}`,
            }),
        }),
        
        // POST /roles - Create new role
        createRolePrivileged: builder.mutation({
            query: ({ bodyData }) => ({
                url: '/roles',
                method: "POST",
                body: bodyData,
            }),
        }),
        
        // PUT /roles/{role} - Update role by ID
        updateRolePrivileged: builder.mutation({
            query: ({ role, bodyData }) => ({
                url: `/roles/${role}`,
                method: 'PUT',
                body: bodyData,
            }),
        }),
        
        // DELETE /roles/{role} - Delete role by ID
        deleteRolePrivileged: builder.mutation({
            query: ({ role }) => ({
                url: `/roles/${role}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllRolesPrivilegedQuery,
    useGetRolePrivilegedQuery,
    useCreateRolePrivilegedMutation,
    useUpdateRolePrivilegedMutation,
    useDeleteRolePrivilegedMutation,
} = PrivateRolesApiPrivileged;
