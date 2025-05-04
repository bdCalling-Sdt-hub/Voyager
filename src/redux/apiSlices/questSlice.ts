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

    // claim quist
    completedQuest: builder.mutation({
      query: id => {
        return {
          url: `/complete-quest?quest_id=${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['quests', 'auth'],
    }),
    // claim quist
    completedAchievement: builder.mutation({
      query: id => {
        return {
          url: `/earn-achievement?id=${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['quests', 'auth'],
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
  useCompletedQuestMutation,
  useCompletedAchievementMutation,
} = questSlice;
