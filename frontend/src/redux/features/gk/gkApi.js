import { apiSlice } from "../api/apiSlice";

export const gkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGk: builder.query({
      query: (page) => ({
        url: `/gk?limit=50&page=${page}`,
        method: "GET",
      }),
      providesTags: ["AllGk"],
    }),
    searchGk: builder.query({
      query: ({ page, searchQuery }) => ({
        url: `/gk/searchGk?limit=50&page=${page}&searchQuery=${searchQuery}`,
        method: "GET",
      }),
      providesTags: ["AllGk"],
    }),
    postGk: builder.mutation({
      query: (data) => ({
        url: "/gk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllGk"],
    }),

    putGk: builder.mutation({
      query: (data) => ({
        url: "/gk",
        method: "PUT",
        body: data,
      }),
    }),

    deleteGk: builder.mutation({
      query: (data) => ({
        url: "/gk",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllGkQuery,
  useSearchGkQuery,
  usePostGkMutation,
  usePutGkMutation,
  useDeleteGkMutation,
} = gkApi;
