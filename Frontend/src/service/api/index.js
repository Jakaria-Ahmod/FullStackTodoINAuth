import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQury } from '../baseQuary';

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQury,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getAllUser: builder.query({
      query: () => '/posts',
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: userData => ({
        url: '/registion',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),

    // deleteUser: builder.mutation({
    //   query: id => ({
    //     url: `/getDeleteuser/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Users'], // delete হলে auto refetch করবে
    // }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  // useDeleteUserMutation,
} = usersApi;
