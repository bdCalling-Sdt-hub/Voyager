import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LStorage} from '../../screens/utils/utils';

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  const token = LStorage.getString('userToken');

  try {
    const result: AxiosResponse = await axios({
      baseURL: 'http://137.59.180.219:8002/api',
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    // Check if response data is a string and malformed
    if (typeof result?.data === 'string') {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += '}');
      return {data: JSON.parse(withCurly)};
      // }
    }
    if (typeof result?.data === 'object') {
      return {data: result?.data};
    }

    return {data: result?.data};
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === 'string') {
        const withCurly = (error.response.data += '}');
        return {error: JSON.parse(withCurly)};
      } else {
        return {error: error.response?.data};
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || 'Something went wrong',
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: [
    'auth',
    'attractions',
    'bucket',
    'friend',
    'shop',
    'dashboard',
    'equipment',
    'quests',
    'setting',
    'subscription',
    'notification',
    'filter',
  ],
});

export const ImageUrl = 'http://137.59.180.219:8002/';

export const makeImage = (url: string) => {
  if (url) {
    return ImageUrl + url;
  }
  return '';
};
