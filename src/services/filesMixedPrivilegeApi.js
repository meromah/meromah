import { baseApi } from "./baseApi";

const toQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return "";
    return `?${new URLSearchParams(params).toString()}`;
};

// Private API for authenticated file operations (high privilege)
const PrivateFileHashesApiPrivileged = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /files - Get all files with filtering (Auth Required)
        getAllFilesPrivileged: builder.query({
            query: ({ queryParams }) => ({
                url: `/files${toQueryString(queryParams)}`,
            }),
        }),
    }),
});

// Public API for file download (no authentication needed)
const PublicFilesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /files/{hash} - Download file by hash (no auth required)
        downloadFile: builder.query({
            query: ({ hash }) => ({
                url: `/files/${hash}`,
                responseType: 'blob', // Important for file downloads
            }),
        }),
    }),
});

// Export private API hooks
export const {
    useGetAllFilesPrivilegedQuery,
} = PrivateFileHashesApiPrivileged;

// Export public API hooks
export const {
    useDownloadFileQuery,
} = PublicFilesApi;
