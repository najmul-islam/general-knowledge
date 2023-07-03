import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  tagTypes: ["User", "Category", "Subcategory", "Subject", "Gk"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, state) => {
      const token = state.getState().auth.user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),

  //users
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // category
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/admin/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/category/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // subcategory
    createSubcategory: builder.mutation({
      query: (body) => ({
        url: "/admin/subcategory",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    // subject
    createSubject: builder.mutation({
      query: (body) => ({
        url: "/admin/subject",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subject"],
    }),

    // gen knowlage
    createGk: builder.mutation({
      query: (body) => ({
        url: "/admin/gk",
        method: "POST",
        body,
      }),
    }),
    invalidatesTags: ["Gk"],
  }),
});

export const {
  useGetAllUserQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubcategoryMutation,
  useCreateSubjectMutation,
  useCreateGkMutation,
} = adminApi;
