import { apiSlice } from "../api/apiSlice";

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: (page) => ({
        url: `/subject?limit=20&page=${page}`,
        method: "GET",
      }),
      providesTags: ["AllSubject"],
    }),
    getSingleSubject: builder.query({
      query: ({ subjectId, page }) => ({
        url: `/subject/${subjectId}?limit=50&page=${page}`,
        method: "GET",
      }),
    }),

    postSubject: builder.mutation({
      query: (data) => ({
        url: "/subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllSubject"],
    }),

    putSubject: builder.mutation({
      query: (data) => ({
        url: "/subject",
        method: "PUT",
        body: data,
      }),
    }),

    deleteSubject: builder.mutation({
      query: (data) => ({
        url: "/subject",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSubjectQuery,
  useGetSingleSubjectQuery,
  usePostSubjectMutation,
  usePutSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
