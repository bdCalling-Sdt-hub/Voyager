import {api} from './BaseApi';

export const AuthSlice = api.injectEndpoints({
  endpoints: builder => ({
    // login
    login: builder.mutation({
      query: data => {
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

    // get username
    getUserName: builder.query({
      query: data => {
        console.log('response check: ', data);
        console.log(`/get-username?query=${data}`);
        return {
          url: `/get-username?query=${data}`,
        };
      },
    }),

    // verify OTP
    verifyOTP: builder.mutation({
      query: data => {
        console.log('from rtk: ', data);
        return {
          url: `/verify-otp`,
          method: 'POST',
          body: data,
        };
      },
    }),

    // resend OTP
    resendOTP: builder.mutation({
      query: data => ({
        url: `/resend-otp`,
        method: 'POST',
        body: data,
      }),
    }),

    // forget password
    forgetPassword: builder.mutation({
      query: data => ({
        url: `/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),

    // Change Password
    changePassword: builder.mutation({
      query: data => {
        return {
          url: `/create-password`,
          method: 'POST',
          body: data,
        };
      },
    }),

    // explore get attractions
    getAttractions: builder.query({
      query: () => ({
        url: `/get-attraction`,
      }),
    }),

    // token validation check
    validateToken: builder.query({
      query: () => ({
        url: `/validate-token`,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUserNameQuery,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgetPasswordMutation,
  useGetAttractionsQuery,
  useChangePasswordMutation,
  useValidateTokenQuery,
} = AuthSlice;
