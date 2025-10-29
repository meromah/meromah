import { privateApi } from './private/privateApi';

// This API service handles role-user assignments management for privileged users
// All endpoints require authentication and elevated permissions for managing user role assignments
// Supports: CRUD operations for role-user relationships with filtering and pagination

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  return `?${new URLSearchParams(params).toString()}`;
};

const roleUsersPrivilegedApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated role-user assignments with optional filtering (Privileged access required)
    getRoleUsersPrivilegedApi: builder.query({
      query: ({ params }) => `/role-users${toQueryString(params)}`,
    }),
    // Get single role-user assignment by ID (Privileged access required)
    getRoleUserByIdPrivilegedApi: builder.query({
      query: ({ roleUserId }) => `/role-users/${roleUserId}`,
    }),
    // Create new role-user assignment (Privileged access required)
    createRoleUserPrivilegedApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/role-users',
        method: 'POST',
        body: bodyData,
      }),
    }),
    // Update existing role-user assignment (Privileged access required)
    updateRoleUserPrivilegedApi: builder.mutation({
      query: ({ roleUserId, bodyData }) => ({
        url: `/role-users/${roleUserId}`,
        method: 'PUT',
        body: bodyData,
      }),
    }),
    // Delete role-user assignment (Privileged access required)
    deleteRoleUserPrivilegedApi: builder.mutation({
      query: ({ roleUserId }) => ({
        url: `/role-users/${roleUserId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRoleUsersPrivilegedApiQuery,
  useGetRoleUserByIdPrivilegedApiQuery,
  useCreateRoleUserPrivilegedApiMutation,
  useUpdateRoleUserPrivilegedApiMutation,
  useDeleteRoleUserPrivilegedApiMutation,
} = roleUsersPrivilegedApi;
