import {api} from '../api/baseApi';

export const FriendSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // get friend for add
    getCategories: builder.query({
      query: () => ({
        url: `/get-category?search=&per_page=100&page=1`,
      }),
      providesTags: ['filter'],
    }),
    getGlobalSearch: builder.query({
      query: data => ({
        url: `/global-filter`,
        body: data,
      }),
      providesTags: ['filter'],
    }),
    // send friend request
    getBestTravelTimes: builder.query({
      query: () => {
        // console.log("id checking from backend: ", id);
        return {
          url: `/get-best-visit-time`,
        };
      },
      providesTags: ['filter'],
    }),
    getActivityLevel: builder.query({
      query: () => {
        // console.log("id checking from backend: ", id);
        return {
          url: `/get-activity-level?&per_page=100&page=1`,
        };
      },
      providesTags: ['filter'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetBestTravelTimesQuery,
  useGetActivityLevelQuery,
  useGetGlobalSearchQuery,
} = FriendSlice;
