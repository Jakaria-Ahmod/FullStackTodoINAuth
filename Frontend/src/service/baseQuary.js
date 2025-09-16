import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../contens/api';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
  prepareHeaders: heders => {
    const token = localStorage.getItem('accessToken');
    if (token) heders.set('Authorization', `Bearer ${token}`);
    return heders;
  },
});

export const baseQury = async (args, api, extraOpiton) => {
  let results = await baseQuery(args, api, extraOpiton);

  //
  if (results.error && results.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        {
          url: '/refresh',
          method: 'POST',
        },
        api,
        extraOpiton
      );
      if (refreshResult.data) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken);
        //
        let results = await baseQuery(args, api, extraOpiton);
      } else {
        console.log('can not fefrash token');
      }
    } catch (error) {
      console.log('refrsh token error', error);
    }
  }
  return results;
};
