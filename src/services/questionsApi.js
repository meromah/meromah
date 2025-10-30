import { privateApi } from "./private/privateApi";

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateQuestionsApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /tests/{test}/questions (paginated)
    getQuestionsForTest: builder.query({
      query: ({ test, queryParams }) =>
        `/tests/${test}/questions${toQueryString(queryParams)}`,
    }),

    // GET /tests/{test}/questions/{question}
    getQuestionFromTestById: builder.query({
      query: ({ test, question }) => `/tests/${test}/questions/${question}`,
    }),

    // POST /tests/{test}/questions
    createQuestion: builder.mutation({
      query: ({ test, bodyData }) => ({
        url: `/tests/${test}/questions`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /tests/{test}/questions/{question}
    updateQuestion: builder.mutation({
      query: ({ test, question, bodyData }) => ({
        url: `/tests/${test}/questions/${question}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /tests/{test}/questions/{question}
    deleteQuestion: builder.mutation({
      query: ({ test, question }) => ({
        url: `/tests/${test}/questions/${question}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetQuestionsForTestQuery,
  useGetQuestionFromTestByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = PrivateQuestionsApi;


