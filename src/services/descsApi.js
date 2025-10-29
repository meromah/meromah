import { privateApi } from "./private/privateApi";
import { publicApi } from "./public/publicApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

// Auth-required endpoints
const PrivateDescsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /descs
    createDesc: builder.mutation({
      query: (bodyData) => ({
        url: "/descs",
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /descs/{desc}
    updateDesc: builder.mutation({
      query: ({ desc, bodyData }) => ({
        url: `/descs/${desc}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /descs/{desc}
    deleteDesc: builder.mutation({
      query: ({ desc }) => ({
        url: `/descs/${desc}`,
        method: "DELETE",
      }),
    }),

    // POST /descs/{desc}/likes (toggle like)
    toggleDescLike: builder.mutation({
      query: ({ desc }) => ({
        url: `/descs/${desc}/likes`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

// Public endpoints (no auth)
const PublicDescsApi = publicApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /descs (paginated)
    getDescs: builder.query({
      query: (queryParams) => `/descs${toQueryString(queryParams)}`,
    }),

    // GET /descs/{desc}
    getDesc: builder.query({
      query: (desc) => `/descs/${desc}`,
    }),

    // GET /descs/{desc}/likes (like count)
    getDescLikes: builder.query({
      query: (desc) => `/descs/${desc}/likes`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDescMutation,
  useUpdateDescMutation,
  useDeleteDescMutation,
  useToggleDescLikeMutation,
} = PrivateDescsApi;

export const {
  useGetDescsQuery,
  useGetDescQuery,
  useGetDescLikesQuery,
} = PublicDescsApi;


