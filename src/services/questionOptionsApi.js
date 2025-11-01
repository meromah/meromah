import { baseApi } from "./baseApi";

const PrivateQuestionOptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /tests/{test}/questions/{question}/options
    getOptionsForQuestion: builder.query({
      query: ({ test, question }) => `/tests/${test}/questions/${question}/options`,
    }),

    // GET /tests/{test}/questions/{question}/options/{option}
    getOptionFromQuestionById: builder.query({
      query: ({ test, question, option }) => `/tests/${test}/questions/${question}/options/${option}`,
    }),

    // POST /tests/{test}/questions/{question}/options
    createOption: builder.mutation({
      query: ({ test, question, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/options`,
        method: "POST",
        body: bodyData,
      }),
    }),

    // PUT /tests/{test}/questions/{question}/options/{option}
    updateOption: builder.mutation({
      query: ({ test, question, option, bodyData }) => ({
        url: `/tests/${test}/questions/${question}/options/${option}`,
        method: "PUT",
        body: bodyData,
      }),
    }),

    // DELETE /tests/{test}/questions/{question}/options/{option}
    deleteOption: builder.mutation({
      query: ({ test, question, option }) => ({
        url: `/tests/${test}/questions/${question}/options/${option}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOptionsForQuestionQuery,
  useGetOptionFromQuestionByIdQuery,
  useCreateOptionMutation,
  useUpdateOptionMutation,
  useDeleteOptionMutation,
} = PrivateQuestionOptionsApi;


