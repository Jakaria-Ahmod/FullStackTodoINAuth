import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../contens/api';

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  //
  if (result.error && result.error.status === 401) {
    console.log('Access token expired, trying refresh...');

    const refreshResult = await baseQuery(
      { url: '/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      //token set
      localStorage.setItem('accessToken', refreshResult.data.accessToken);

      //
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Cannot refresh token, logout user');
      //  logout logic call করা যায়
    }
  }

  return result;
};
