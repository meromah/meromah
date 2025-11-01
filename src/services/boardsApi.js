import { baseApi } from "./baseApi";

/*
This api is not complete yet. It will contain all board related endpoints,
both private and public.
*/

const toQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
};

const PrivateBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation({
      query: (boardData) => ({
        url: "/boards",
        method: "POST",
        body: boardData,
      }),
    }),
    updateBoard: builder.mutation({
      query: ({ board, boardData }) => ({
        url: `/boards/${board}`,
        method: "PUT",
        body: boardData,
      }),
    }),
    deleteBoard: builder.mutation({
      query: ({ board }) => ({
        url: `/boards/${board}`,
        method: "DELETE",
      }),
    }),
    // check if a name available for a new board
    checkBoardNameIsAvailable: builder.query({
      query: (boardData) => ({
        url: `/boards/isNameAvailable${toQueryString(boardData)}`,
      }),
    }),
  }),
});
const PublicBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all boards
    getBoards: builder.query({
      query: (queryParams) => `/boards${toQueryString(queryParams)}`,
    }),
    getBoard: builder.query({
      query: (board) => `/boards/${board}`,
    }),
  }),
});


export const {
  useUpdateBoardMutation,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useCheckBoardNameIsAvailableQuery,
} = PrivateBoardApi;

export const {
  useGetBoardsQuery,
  useGetBoardQuery
} = PublicBoardApi;
