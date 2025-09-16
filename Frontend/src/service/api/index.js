import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuary';
// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: userData => ({
        url: '/registion',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    loginUser: builder.mutation({
      query: userData => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    verifyEmail: builder.query({
      query: token => `/verify/${token}`,
    }),
    forgetPassword: builder.mutation({
      query: payload => ({
        url: '/forget-password',
        method: 'POST',
        body: payload, // { email }
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`,
        method: 'POST',
        body: { password }, // { email }
      }),
    }),

    getUsers: builder.query({
      query: () => '/allUser',
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyEmailQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetUsersQuery,
} = usersApi;
