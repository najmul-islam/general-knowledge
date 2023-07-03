import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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

  endpoints: (builder) => ({
    register: builder.mutation({
      mutation: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation({
      mutation: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
