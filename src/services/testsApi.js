import { privateApi } from "./private/privateApi";
import { publicApi } from "./public/publicApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

// Auth-required endpoints
const PrivateTestsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /descs/{desc}/tests (paginated)
    getTestsForDesc: builder.query({
      query: ({ desc, queryParams }) =>
        `/descs/${desc}/tests${toQueryString(queryParams)}`,
    }),
    // GET /tests/my
    getAllMyTests: builder.query({
      query: ( queryParams ) => ({
        url: `/tests/my${toQueryString(queryParams)}`,
      }),
    }),
    // GET /descs/{desc}/tests/{test}
    getTestFromDescById: builder.query({
      query: ({ desc, test }) => `/descs/${desc}/tests/${test}`,
    }),

    // POST /descs/{desc}/tests
    createTest: builder.mutation({
      query: ({ desc, bodyData }) => ({
        url: `/descs/${desc}/tests`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /descs/{desc}/tests/{test}
    updateTest: builder.mutation({
      query: ({ desc, test, bodyData }) => ({
        url: `/descs/${desc}/tests/${test}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /descs/{desc}/tests/{test}
    deleteTest: builder.mutation({
      query: ({ desc, test }) => ({
        url: `/descs/${desc}/tests/${test}`,
        method: "DELETE",
      }),
    }),

    // POST /descs/{desc}/tests/{test}/likes (toggle like)
    toggleTestLike: builder.mutation({
      query: ({ desc, test }) => ({
        url: `/descs/${desc}/tests/${test}/likes`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

// Public endpoint for like count
const PublicTestsApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /descs/{desc}/tests/{test}/likes (like count)
    getTestLikes: builder.query({
      query: ({ desc, test }) => `/descs/${desc}/tests/${test}/likes`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTestsForDescQuery,
  useGetAllMyTestsQuery,
  useGetTestFromDescByIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useToggleTestLikeMutation,
} = PrivateTestsApi;

export const {
  useGetTestLikesQuery,
} = PublicTestsApi;
