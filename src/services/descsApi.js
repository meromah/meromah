import { privateApi } from "./private/privateApi";
import { publicApi } from "./public/publicApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateDescsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /test-categories (Auth Required)
    getDescs: builder.query({
      query: ({ queryParams } = {}) => `/test-categories${toQueryString(queryParams)}`,
    }),

    // GET /test-categories/{testCategory} (Auth Required)
    getDescById: builder.query({
      query: ({ testCategory }) => `/test-categories/${testCategory}`,
    }),

    // POST /test-categories (Auth Required)
    createDesc: builder.mutation({
      query: ({ bodyData }) => ({
        url: "/test-categories",
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /test-categories/{testCategory} (Auth Required)
    updateDesc: builder.mutation({
      query: ({ testCategory, bodyData }) => ({
        url: `/test-categories/${testCategory}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /test-categories/{testCategory} (Auth Required)
    deleteDesc: builder.mutation({
      query: ({ testCategory }) => ({
        url: `/test-categories/${testCategory}`,
        method: "DELETE",
      }),
    }),

    // POST /test-categories/{testCategory}/likes (Auth Required) - Toggle like
    toggleDescLike: builder.mutation({
      query: ({ testCategory }) => ({
        url: `/test-categories/${testCategory}/likes`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

const PublicDescsApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /test-categories/{testCategory}/likes - Like count (Public)
    getDescLikes: builder.query({
      query: ({ testCategory }) => `/test-categories/${testCategory}/likes`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDescsQuery,
  useGetDescByIdQuery,
  useCreateDescMutation,
  useUpdateDescMutation,
  useDeleteDescMutation,
  useToggleDescLikeMutation,
} = PrivateDescsApi;

export const {
  useGetDescLikesQuery,
} = PublicDescsApi;
