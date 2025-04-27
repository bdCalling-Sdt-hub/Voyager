import {api} from './BaseApi';

export const AuthApiSlice = api.injectEndpoints({
  overrideExisting: true,
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
  
      // get avatar
      getAvatar: builder.query({
        query: () => ({
          url: `/get-shop-avatar`,
        }),
        providesTags: ['updateAvatar'],
      }),
  
      // get friend for add
      getFriendForAdd: builder.query({
        query: () => ({
          url: `/add-friends?per_page=10&page=1`,
        }),
        providesTags: ['addFriends', 'cancelFriendRequest'],
      }),
  
      // get friend requests
      getFriendRequests: builder.query({
        query: () => ({
          url: `/user-friend-requests`,
        }),
        providesTags: ['addFriends', 'cancelFriendRequest'],
      }),
  
      // accept friend request
      acceptFriendRequest: builder.mutation({
        query: ({id}) => {
          console.log(`/accept-request?friend_id=${id}`);
          return {
            url: `/accept-request?friend_id=${id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['addFriends'],
      }),
  
      // equip avatar
      equipAvatar: builder.mutation({
        query: ({id, data}) => {
          return {
            url: `/equip_avatar?id=${id}&_method=PUT`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['updateProfile', 'updateAvatar'],
      }),
  
      // buy avatar
      buyAvatar: builder.mutation({
        query: ({id}) => {
          return {
            url: `/buy-shop-avatar?id=${id}&_method=PUT`,
            method: 'POST',
          };
        },
        invalidatesTags: ['updateAvatar'],
      }),
      // get personalized picks
      getPersonalized: builder.query({
        query: () => ({
          url: `/personalized`,
        }),
        providesTags: ['bucketlistRemoved', 'bucketlistAdded', 'visited'],
      }),
  
      // send friend request
      sendFriendRequest: builder.mutation({
        query: ({id}) => {
          // console.log("id checking from backend: ", id);
          return {
            url: `/friend-request?friend_id=${id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['addFriends'],
      }),
  
      // cancel friend request
      cancelFriendRequest: builder.mutation({
        query: ({id}) => ({
          url: `/cancel-request?friend_id=${id}&_method=PUT`,
          method: 'POST',
        }),
        invalidatesTags: ['cancelFriendRequest'],
      }),
  
      // unfriend user
      unfriendUser: builder.mutation({
        query: ({id}) => ({
          url: `/unfriend?friend_id=${id}`,
          method: 'PUT',
        }),
        invalidatesTags: ['addFriends'],
      }),
  
      // get top destination
      getTopDestination: builder.query({
        query: () => ({
          url: `/destination`,
        }),
        providesTags: ['bucketlistAdded'],
      }),
 // get friends
 getFriends: builder.query({
    query: () => ({
      url: `/user-friends?per_page=10&page=1`,
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
  useGetPersonalizedQuery,
  useGetTopDestinationQuery,
  useGetFriendsQuery,
  useGetOthersProfileQuery,
  useUpdateProfileMutation,
  useGetAvatarQuery,
  useGetFriendForAddQuery,
  useSendFriendRequestMutation,
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useUnfriendUserMutation,
  useEquipAvatarMutation,
  useBuyAvatarMutation,
  
} = AuthApiSlice;
