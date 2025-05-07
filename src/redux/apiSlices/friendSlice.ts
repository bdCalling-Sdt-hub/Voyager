import {api} from '../api/baseApi';

export const FriendSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // get friend for add
    getFriendForAdd: builder.query({
      query: () => ({
        url: `/add-friends?per_page=10&page=1`,
      }),
      providesTags: ['friend'],
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
      invalidatesTags: ['friend'],
    }),

    // cancel friend request
    cancelFriendRequest: builder.mutation({
      query: ({id}) => ({
        url: `/cancel-request?friend_id=${id}&_method=PUT`,
        method: 'POST',
      }),
      invalidatesTags: ['friend'],
    }),

    // unfriend user
    unfriendUser: builder.mutation({
      query: ({id}) => ({
        url: `/unfriend?friend_id=${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['friend'],
    }),
    // get friend requests
    getFriendRequests: builder.query({
      query: () => ({
        url: `/user-friend-requests`,
      }),
      providesTags: ['friend'],
    }),
    // get friends
    getFriends: builder.query({
      query: () => ({
        url: `/user-friends?per_page=100&page=1`,
      }),
      providesTags: ['friend'],
    }),
    // accept friend request
    acceptFriendRequest: builder.mutation({
      query: data => {
        return {
          url: `/accept-request`,
          params: data,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['friend', 'notification'],
    }),
  }),
});

export const {
  useGetFriendForAddQuery,
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useSendFriendRequestMutation,
  useCancelFriendRequestMutation,
  useUnfriendUserMutation,
  useGetFriendsQuery,
} = FriendSlice;
