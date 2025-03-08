import {api} from './BaseApi';

export const AuthSlice = api.injectEndpoints({
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

    // get city
    getCity: builder.query({
      query: () => ({
        url: `/get-city`,
      }),
    }),

    // get country
    getCountry: builder.query({
      query: () => ({
        url: `/get-country`,
      }),
    }),

    // get profile
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
      }),
    }),

    // get personalized picks
    getPersonalized: builder.query({
      query: () => ({
        url: `/personalized`,
      }),
    }),

    // get top destination
    getTopDestination: builder.query({
      query: () => ({
        url: `/destination`,
      }),
    }),

    // app dashboard
    appDashboard: builder.query({
      query: () => ({
        url: `/app-dashboard`,
      }),
    }),

    // get weekly quest progress
    getWeeklyQuestProgress: builder.query({
      query: () => ({
        url: `/dashboard-weekly-quest-progress`,
      }),
    }),

    // update password
    updatePassword: builder.mutation({
      query: data => ({
        url: `/update-password`,
        method: 'POST',
        body: data,
      }),
    }),

    // profile queries

    // get achievements
    getAchievements: builder.query({
      query: () => ({
        url: `/get-achivevement`,
      }),
    }),

    // shop banner
    getShopBanner: builder.query({
      query: () => ({
        url: `/get-shopbanner`,
      }),
    }),

    // get visited
    getVisited: builder.query({
      query: () => ({
        url: `/get-visited`,
      }),
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
    }),

    // get user friend attractions
    getUserFriendAttractions: builder.query({
      query: ({id}) => ({
        url: `/user-friend-attraction?friend_id=${id}&per_page=10`,
      }),
    }),

    // goals queries

    // bucketlist attractions
    getBucketListAttractions: builder.query({
      query: () => ({
        url: `/attraction-bucklist`,
      }),
    }),

    // bucketlist cities
    getBucketListCities: builder.query({
      query: () => ({
        url: `/city-bucklist`,
      }),
    }),
    
    // bucketlist countries
    getBucketListCountries: builder.query({
      query: () => ({
        url: `/country-bucklist`,
      }),
    }),

    // bucketlist banner
    getBucketListBanner: builder.query({
      query: () => ({
        url: `/user-bucket`,
      }),
    }),

    // add to bucket list
    addToBucketList: builder.mutation({
      query: ({id, data}) => {
        return{
          url: `/add-to-bucketlist?id=${id}`,
          method: 'POST',
          body: data,
        }
      },
    }),

    // location visit
    locationVisit: builder.mutation({
      query: ({id, data}) => {
        console.log("location visit id check from rtk: ", id);
        return{
          url: `visited?id=${id}&_method=PUT`,
          method: 'POST',
          body: data,
        }
      },
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
  useGetCityQuery,
  useGetCountryQuery,
  useGetProfileQuery,
  useGetPersonalizedQuery,
  useGetTopDestinationQuery,
  useAppDashboardQuery,
  useGetWeeklyQuestProgressQuery,
  useUpdatePasswordMutation,

  // profile queries
  useGetAchievementsQuery,
  useGetShopBannerQuery,
  useGetVisitedQuery,
  useGetFriendsQuery,
  useGetOthersProfileQuery,
  useGetUserFriendAttractionsQuery,

  // goals queries
  useGetBucketListAttractionsQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
  useGetBucketListBannerQuery,

  // add to bucket list queries
  useAddToBucketListMutation,
  useLocationVisitMutation,
} = AuthSlice;
