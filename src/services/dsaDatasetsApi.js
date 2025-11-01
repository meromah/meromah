import { baseApi } from "./baseApi";

const PrivateDsaDatasetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /tests/{test}/questions/{question}/datasets
    getDatasetsForQuestion: builder.query({
      query: ({ test, question }) => `/tests/${test}/questions/${question}/datasets`,
    }),

    // GET /tests/{test}/questions/{question}/datasets/{dataset}
    getDatasetFromQuestionById: builder.query({
      query: ({ test, question, dataset }) => `/tests/${test}/questions/${question}/datasets/${dataset}`,
    }),

    // POST /tests/{test}/questions/{question}/datasets
    createDataset: builder.mutation({
      query: ({ test, question, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/datasets`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /tests/{test}/questions/{question}/datasets/{dataset}
    updateDataset: builder.mutation({
      query: ({ test, question, dataset, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/datasets/${dataset}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /tests/{test}/questions/{question}/datasets/{dataset}
    deleteDataset: builder.mutation({
      query: ({ test, question, dataset }) => ({
        url: `/tests/${test}/questions/${question}/datasets/${dataset}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDatasetsForQuestionQuery,
  useGetDatasetFromQuestionByIdQuery,
  useCreateDatasetMutation,
  useUpdateDatasetMutation,
  useDeleteDatasetMutation,
} = PrivateDsaDatasetsApi;


