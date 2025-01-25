import {api} from './BaseApi';

export const AuthSlice = api.injectEndpoints({
  endpoints: builder => ({
    // login
    login: builder.mutation({
        query: (data) => {
          console.log('Login data:', data);
          return {
            url: `/login`,
            method: 'POST',
            body: data,
          };
        },
      }),
      

    // signUp
    signUp: builder.mutation({
      query: data => ({
        url: `/sign-up`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useLoginMutation, useSignUpMutation} = AuthSlice;
