import {api} from '../api/baseApi';

export const AuthApiSlice = api.injectEndpoints({
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
    // update password
    updatePassword: builder.mutation({
      query: data => ({
        url: `/update-password`,
        method: 'POST',
        body: data,
      }),
    }),

    // get profile
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
      }),
      providesTags: ['visited', 'profileUpdate', 'updateAvatar'],
    }),

    // update profile
    updateProfile: builder.mutation({
      query: data => ({
        url: `/profile-update?_method=PUT`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profileUpdate'],
    }),

    // token validation check
    validateToken: builder.query({
      query: () => ({
        url: `/validate-token`,
      }),
    }),

    // other user profile data by id
    getOthersProfile: builder.query({
      query: ({id}) => ({
        url: `/user-friend-profile?friend_id=${id}`,
      }),
      providesTags: [
        'cancelFriendRequest',
        'addFriends',
        'cancelFriendRequest',
      ],
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
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useGetProfileQuery,

  useGetOthersProfileQuery,
  useUpdateProfileMutation,
  useValidateTokenQuery,
} = AuthApiSlice;
