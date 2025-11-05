import { baseApi } from "./baseApi";

/*
  This api is for sending and downloading files.
  File upload flow to any model is as follows:
    1 - upload file to approptiate endpoint below: post, comment, banner, ...
    2 - download them using those hashes or attach them as file_hashes to appropriate resource e.g. posts, comments, question, etc.
*/

const FileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadPostFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: '/files/post',
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadCommentFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: '/files/comment',
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadQuestionFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: '/files/question',
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadTestFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: '/files/test',
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadBoardBannerFiles: builder.mutation({
      query: ({ files, board }) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: `/files/boards/${board}/banner`,
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadDescBannerFiles: builder.mutation({
      query: ({ desc, files }) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: `/files/descs/${desc}/banner`,
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadUserAvatarFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: `/files/me/avatar`,
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    uploadUserBannerFiles: builder.mutation({
      query: (files) => {
        if (!Array.isArray(files)) {
          throw new Error('uploadPostFiles expects an array of File objects');
        }

        const formData = new FormData();
        for (const file of files) {
          if (file) formData.append('files[]', file);
        }

        return {
          url: `/files/me/banner`,
          method: 'POST',
          body: formData, // fetch will set the correct multipart boundary automatically
        };
      },
    }),
    downloadFile: builder.query({
      query: (hashId) => ({
        url: `/files/${hashId}`,
        method: "GET",
        // Ensure we get a Blob instead of attempting JSON parse
        responseHandler: (response) => response.blob(),
        headers: {
          Accept: 'application/octet-stream',
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useUploadPostFilesMutation,
  useUploadCommentFilesMutation,
  useUploadQuestionFilesMutation,
  useUploadTestFilesMutation,
  useUploadBoardBannerFilesMutation,
  useUploadDescBannerFilesMutation,
  useDownloadFileQuery,
} = FileApi;
