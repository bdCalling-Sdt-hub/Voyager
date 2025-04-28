import {api} from '../api/baseApi';

export const DashboardSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
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
  }),
});

export const {useAppDashboardQuery, useGetWeeklyQuestProgressQuery} =
  DashboardSlice;
