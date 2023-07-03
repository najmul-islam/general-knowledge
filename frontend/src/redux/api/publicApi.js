import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
  reducerPath: "publicApi",
  tagTypes: ["Category", "Subcategory", "Subject", "Gk"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    // category
    getAllCategory: builder.query({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // subcategory
    getAllSubcategory: builder.query({
      query: () => ({
        url: "subcategory",
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    }),
    getSingleSubcategory: builder.query({
      query: (id) => ({
        url: `subcategory/${id}`,
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    }),

    // subject
    getAllSubject: builder.query({
      query: () => ({
        url: "subject",
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),
    getSingleSubject: builder.query({
      query: (id) => ({
        url: `subject/${id}`,
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),

    // gk
    getAllGk: builder.query({
      query: () => ({
        url: "gk",
        method: "GET",
      }),
      providesTags: ["Gk"],
    }),
    getSingleGk: builder.query({
      query: (id) => ({
        url: `gk/${id}`,
        method: "GET",
      }),
      providesTags: ["Gk"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetAllSubcategoryQuery,
  useGetSingleSubcategoryQuery,
  useGetAllSubjectQuery,
  useGetSingleSubjectQuery,
  useGetAllGkQuery,
  useGetSingleGkQuery,
} = publicApi;
