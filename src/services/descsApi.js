import { baseApi } from "./baseApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

// Auth-required endpoints
const DescsApi = baseApi.injectEndpoints({
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

    // GET reqeust -> check if a name is available for a new desc
    checkDescNameIsAvailable: builder.query({
      query: (queryParams) => ({
        url: `/descs/isNameAvailable${toQueryString(queryParams)}`,
      })
    }),

  }),
  overrideExisting: true,
});

export const {
  useCreateDescMutation,
  useUpdateDescMutation,
  useDeleteDescMutation,
  useToggleDescLikeMutation,
  useGetDescsQuery,
  useGetDescQuery,
  useGetDescLikesQuery,
  useCheckDescNameIsAvailable
} = DescsApi;
