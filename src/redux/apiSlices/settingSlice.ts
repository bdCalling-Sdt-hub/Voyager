import {api} from '../api/baseApi';

export const SettingSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
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

    // get notifications
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
    }),

    // get faq
    getFaq: builder.query({
      query: () => ({
        url: `/get-faq`,
      }),
    }),

    // get terms and conditions
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/get-term_condition`,
      }),
    }),

    // --------- travel preferences ---------

    // get travel preferences
    getTravelPreferences: builder.query({
      query: () => ({
        url: `/get-preference`,
      }),
      providesTags: ['travelInterest'],
    }),

    //  add travel interest
    addTravelInterest: builder.mutation({
      query: data => {
        return {
          url: `/travel-interest`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['travelInterest'],
    }),
  }),
});

export const {
  useGetAchievementsQuery,
  useGetShopBannerQuery,

  // notifications
  useGetNotificationsQuery,

  // settings
  useGetFaqQuery,
  useGetTermsAndConditionsQuery,

  // travel preferences
  useGetTravelPreferencesQuery,
  useAddTravelInterestMutation,
} = SettingSlice;
