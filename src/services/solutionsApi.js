import { baseApi } from './baseApi';

// This API service handles solution checking for various question types, code execution, and open-ended questions
// Private endpoints require authentication, public endpoints are accessible without authentication
// Supports: DSA questions, MCQ questions/tests, Python playground, and open-ended question management

const privateSolutionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Check solution for old DSA questions
    checkOldDsaQuestionApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/old-dsa/check',
        method: "POST",
        body: bodyData,
      }),
    }),
    // Check solution for MCQ questions
    checkMcqQuestionApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/mcq-question/check',
        method: "POST",
        body: bodyData,
      }),
    }),
    // Check solution for MCQ tests
    checkMcqTestApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/mcq-test/check',
        method: "POST",
        body: bodyData,
      }),
    }),
    // Submit solution for open-ended questions
    submitOpenEndedQuestionApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/open-ended-questions',
        method: "POST",
        body: bodyData,
      }),
    }),
    // note for self, check which routes are for admin and which are for user.
    // proofread api service namings.
    // Get open-ended question solution by ID
    getOpenEndedQuestionSolutionApi: builder.query({
      query: ({ solutionId }) => `/solutions/open-ended-questions/${solutionId}`,
    }),
    // Get open-ended question solutions by user ID
    getOpenEndedQuestionsByUserApiAsAdmin: builder.query({
      query: ({ userId }) => `/solutions/open-ended-questions/user/${userId}`,
    }),
    // Get open-ended question solutions by date
    getOpenEndedQuestionsByDateApiAsAdmin: builder.query({
      query: ({ date }) => `/solutions/open-ended-questions/date?date=${date}`,
    }),
    // Get open-ended question solutions by question ID
    getOpenEndedQuestionsByQuestionApiAsAdmin: builder.query({
      query: ({ questionId }) => `/solutions/open-ended-questions/question?question_id=${questionId}`,
    }),
    // Review open-ended question solution
    reviewOpenEndedQuestionApiAsAdmin: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/open-ended-questions/review',
        method: "PUT",
        body: bodyData,
      }),
    }),
  }),
});

const publicSolutionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Execute Python code in playground environment
    playPythonApi: builder.mutation({
      query: ({ bodyData }) => ({
        url: '/solutions/python-playground',
        method: "POST",
        body: bodyData,
      }),
    }),
  }),
});


// update code above, and update code below.
export const {
  useCheckOldDsaQuestionApiMutation,
  useCheckMcqQuestionApiMutation,
  useCheckMcqTestApiMutation,
  useSubmitOpenEndedQuestionApiMutation,
  useGetOpenEndedQuestionSolutionApiQuery,
  useGetOpenEndedQuestionsByUserApiAsAdminQuery,
  useGetOpenEndedQuestionsByDateApiAsAdminQuery,
  useGetOpenEndedQuestionsByQuestionApiAsAdminQuery,
  useReviewOpenEndedQuestionApiAsAdminMutation,
} = privateSolutionsApi;

export const {
  usePlayPythonApiMutation,
} = publicSolutionsApi;
