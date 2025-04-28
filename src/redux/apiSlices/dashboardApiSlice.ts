import {api} from '../api/baseApi';

export const DashboardSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // app dashboard
    appDashboard: builder.query({
      query: () => ({
        url: `/app-dashboard`,
      }),
      providesTags: ['dashboard'],
    }),
    getBucketListData: builder.query({
      query: () => ({
        url: `/dashboard-bucklist-data`,
      }),
      providesTags: ['dashboard'],
    }),

    // get weekly quest progress
    getWeeklyQuestProgress: builder.query({
      query: () => ({
        url: `/dashboard-weekly-quest-progress`,
      }),
      providesTags: ['dashboard'],
    }),
  }),
});

export const {
  useAppDashboardQuery,
  useGetWeeklyQuestProgressQuery,
  useGetBucketListDataQuery,
} = DashboardSlice;
