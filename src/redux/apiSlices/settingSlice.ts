import {api} from '../api/baseApi';

export const SettingSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // get achievements
    getAchievements: builder.query({
      query: () => ({
        url: `/get-achivevement`,
      }),
      providesTags: ['setting'],
    }),

    // shop banner
    getShopBanner: builder.query({
      query: () => ({
        url: `/get-shopbanner`,
      }),
      providesTags: ['setting'],
    }),

    // get notifications
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
      providesTags: ['setting'],
    }),

    // get faq
    getFaq: builder.query({
      query: () => ({
        url: `/get-faq`,
      }),
      providesTags: ['setting'],
    }),

    // get terms and conditions
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/get-term_condition`,
      }),
      providesTags: ['setting'],
    }),

    // --------- travel preferences ---------

    // get travel preferences
    getTravelPreferences: builder.query({
      query: () => ({
        url: `/get-preference`,
      }),
      providesTags: ['setting'],
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
      invalidatesTags: ['setting'],
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
