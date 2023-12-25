import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
    }),

    getUserGk: builder.query({
      query: () => ({
        url: "/user/all-gk",
        method: "GET",
      }),
    }),

    getUserSubject: builder.query({
      query: () => ({
        url: "/user/all-subject",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useGetUserGkQuery,
  useGetUserSubjectQuery,
} = userApi;
