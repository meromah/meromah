import { privateApi } from "./private/privateApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

const PrivateEnrollmentYearsApiPrivileged = privateApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /enrollment-year - Get all enrollment years
        getAllEnrollmentYearsPrivileged: builder.query({
            query: () => ({
                url: '/enrollment-year',
            }),
        }),
        
        // GET /enrollment-year/{enrollmentYear} - Get single enrollment year by ID
        getEnrollmentYearPrivileged: builder.query({
            query: ({ enrollmentYear }) => ({
                url: `/enrollment-year/${enrollmentYear}`,
            }),
        }),
        
        // POST /enrollment-year - Create new enrollment year (Auth Required)
        createEnrollmentYearPrivileged: builder.mutation({
            query: ({ bodyData }) => ({
                url: '/enrollment-year',
                method: "POST",
                body: bodyData,
            }),
        }),
        
        // PUT /enrollment-year/{enrollmentYear} - Update enrollment year by ID (Auth Required)
        updateEnrollmentYearPrivileged: builder.mutation({
            query: ({ enrollmentYear, bodyData }) => ({
                url: `/enrollment-year/${enrollmentYear}`,
                method: 'PUT',
                body: bodyData,
            }),
        }),
        
        // DELETE /enrollment-year/{enrollmentYear} - Delete enrollment year by ID (Auth Required)
        deleteEnrollmentYearPrivileged: builder.mutation({
            query: ({ enrollmentYear }) => ({
                url: `/enrollment-year/${enrollmentYear}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllEnrollmentYearsPrivilegedQuery,
    useGetEnrollmentYearPrivilegedQuery,
    useCreateEnrollmentYearPrivilegedMutation,
    useUpdateEnrollmentYearPrivilegedMutation,
    useDeleteEnrollmentYearPrivilegedMutation,
} = PrivateEnrollmentYearsApiPrivileged;
