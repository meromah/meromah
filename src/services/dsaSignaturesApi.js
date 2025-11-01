import { baseApi } from "./baseApi";

const PrivateDsaSignaturesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /tests/{test}/questions/{question}/signatures
    getSignaturesForQuestion: builder.query({
      query: ({ test, question }) => `/tests/${test}/questions/${question}/signatures`,
    }),

    // GET /tests/{test}/questions/{question}/signatures/{signature}
    getSignatureFromQuestionById: builder.query({
      query: ({ test, question, signature }) => `/tests/${test}/questions/${question}/signatures/${signature}`,
    }),

    // POST /tests/{test}/questions/{question}/signatures
    createSignature: builder.mutation({
      query: ({ test, question, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/signatures`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /tests/{test}/questions/{question}/signatures/{signature}
    updateSignature: builder.mutation({
      query: ({ test, question, signature, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/signatures/${signature}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /tests/{test}/questions/{question}/signatures/{signature}
    deleteSignature: builder.mutation({
      query: ({ test, question, signature }) => ({
        url: `/tests/${test}/questions/${question}/signatures/${signature}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSignaturesForQuestionQuery,
  useGetSignatureFromQuestionByIdQuery,
  useCreateSignatureMutation,
  useUpdateSignatureMutation,
  useDeleteSignatureMutation,
} = PrivateDsaSignaturesApi;


