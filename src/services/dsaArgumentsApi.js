import { baseApi } from "./baseApi";

const PrivateDsaArgumentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /tests/{test}/questions/{question}/datasets/{dataset}/arguments
    getArgumentsForDataset: builder.query({
      query: ({ test, question, dataset }) => `/tests/${test}/questions/${question}/datasets/${dataset}/arguments`,
    }),

    // GET /tests/{test}/questions/{question}/datasets/{dataset}/arguments/{argument}
    getArgumentFromDatasetById: builder.query({
      query: ({ test, question, dataset, argument }) => `/tests/${test}/questions/${question}/datasets/${dataset}/arguments/${argument}`,
    }),

    // POST /tests/{test}/questions/{question}/datasets/{dataset}/arguments
    createArgument: builder.mutation({
      query: ({ test, question, dataset, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/datasets/${dataset}/arguments`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /tests/{test}/questions/{question}/datasets/{dataset}/arguments/{argument}
    updateArgument: builder.mutation({
      query: ({ test, question, dataset, argument, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/datasets/${dataset}/arguments/${argument}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /tests/{test}/questions/{question}/datasets/{dataset}/arguments/{argument}
    deleteArgument: builder.mutation({
      query: ({ test, question, dataset, argument }) => ({
        url: `/tests/${test}/questions/${question}/datasets/${dataset}/arguments/${argument}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetArgumentsForDatasetQuery,
  useGetArgumentFromDatasetByIdQuery,
  useCreateArgumentMutation,
  useUpdateArgumentMutation,
  useDeleteArgumentMutation,
} = PrivateDsaArgumentsApi;


