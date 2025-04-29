import {api} from '../api/baseApi';

export const questSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // quests queries

    // get weekly quests
    getWeeklyQuests: builder.query({
      query: () => ({
        url: `/weekly-quests`,
      }),
      providesTags: ['quests'],
    }),

    // get quest achievements
    getQuestAchievements: builder.query({
      query: () => ({
        url: `/quest-achievement`,
      }),
      providesTags: ['quests'],
    }),
  }),
});

export const {
  // weekly quests
  useGetWeeklyQuestsQuery,
  useGetQuestAchievementsQuery,
} = questSlice;
