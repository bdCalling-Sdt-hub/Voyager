// import {api} from '../api/BaseApi';

// export const AuthSlice = api.injectEndpoints({
//   overrideExisting: true,
//   endpoints: builder => ({
//     // // login
//     // login: builder.mutation({
//     //   query: data => {
//     //     return {
//     //       url: `/login`,
//     //       method: 'POST',
//     //       body: data,
//     //     };
//     //   },
//     // }),

//     // // signUp
//     // signUp: builder.mutation({
//     //   query: data => ({
//     //     url: `/sign-up`,
//     //     method: 'POST',
//     //     body: data,
//     //   }),
//     // }),

//     // // get username
//     // getUserName: builder.query({
//     //   query: data => {
//     //     console.log('response check: ', data);
//     //     console.log(`/get-username?query=${data}`);
//     //     return {
//     //       url: `/get-username?query=${data}`,
//     //     };
//     //   },
//     // }),

//     // // verify OTP
//     // verifyOTP: builder.mutation({
//     //   query: data => {
//     //     console.log('from rtk: ', data);
//     //     return {
//     //       url: `/verify-otp`,
//     //       method: 'POST',
//     //       body: data,
//     //     };
//     //   },
//     // }),

//     // // resend OTP
//     // resendOTP: builder.mutation({
//     //   query: data => ({
//     //     url: `/resend-otp`,
//     //     method: 'POST',
//     //     body: data,
//     //   }),
//     // }),

//     // // forget password
//     // forgetPassword: builder.mutation({
//     //   query: data => ({
//     //     url: `/forgot-password`,
//     //     method: 'POST',
//     //     body: data,
//     //   }),
//     // }),

//     // // Change Password
//     // changePassword: builder.mutation({
//     //   query: data => {
//     //     return {
//     //       url: `/create-password`,
//     //       method: 'POST',
//     //       body: data,
//     //     };
//     //   },
//     // }),

//     // // --------------------DONE all upp  -------------------

//     //     // --------------------Done all down  -------------------

//     //     // explore get attractions
//     //     getAttractions: builder.query({
//     //       query: () => ({
//     //         url: `/get-attraction`,
//     //       }),
//     //       providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //     }),

//     //     // get city
//     //     getCity: builder.query({
//     //       query: () => ({
//     //         url: `/get-city`,
//     //       }),
//     //       providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //     }),

//     //     // get country
//     //     getCountry: builder.query({
//     //       query: () => ({
//     //         url: `/get-country`,
//     //       }),
//     //       providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //     }),

//     //    // --------------------DONE all upp  -------------------

//     //  // --------------------Done all down  -------------------

//     //     // get profile
//     //     getProfile: builder.query({
//     //       query: () => ({
//     //         url: `/profile`,
//     //       }),
//     //       providesTags: ['visited', 'profileUpdate', 'updateAvatar'],
//     //     }),

//     //     // update profile
//     //     updateProfile: builder.mutation({
//     //       query: data => ({
//     //         url: `/profile-update?_method=PUT`,
//     //         method: 'POST',
//     //         body: data,
//     //       }),
//     //       invalidatesTags: ['profileUpdate'],
//     //     }),

//     //     // get avatar
//     //     getAvatar: builder.query({
//     //       query: () => ({
//     //         url: `/get-shop-avatar`,
//     //       }),
//     //       providesTags: ['updateAvatar'],
//     //     }),

//     //     // get friend for add
//     //     getFriendForAdd: builder.query({
//     //       query: () => ({
//     //         url: `/add-friends?per_page=10&page=1`,
//     //       }),
//     //       providesTags: ['addFriends', 'cancelFriendRequest'],
//     //     }),

//     //     // get friend requests
//     //     getFriendRequests: builder.query({
//     //       query: () => ({
//     //         url: `/user-friend-requests`,
//     //       }),
//     //       providesTags: ['addFriends', 'cancelFriendRequest'],
//     //     }),

//     //     // accept friend request
//     //     acceptFriendRequest: builder.mutation({
//     //       query: ({id}) => {
//     //         console.log(`/accept-request?friend_id=${id}`);
//     //         return {
//     //           url: `/accept-request?friend_id=${id}`,
//     //           method: 'PATCH',
//     //         };
//     //       },
//     //       invalidatesTags: ['addFriends'],
//     //     }),

//     //     // equip avatar
//     //     equipAvatar: builder.mutation({
//     //       query: ({id, data}) => {
//     //         return {
//     //           url: `/equip_avatar?id=${id}&_method=PUT`,
//     //           method: 'POST',
//     //           body: data,
//     //         };
//     //       },
//     //       invalidatesTags: ['updateProfile', 'updateAvatar'],
//     //     }),

//     //     // buy avatar
//     //     buyAvatar: builder.mutation({
//     //       query: ({id}) => {
//     //         return {
//     //           url: `/buy-shop-avatar?id=${id}&_method=PUT`,
//     //           method: 'POST',
//     //         };
//     //       },
//     //       invalidatesTags: ['updateAvatar'],
//     //     }),
//     //     // get personalized picks
//     //     getPersonalized: builder.query({
//     //       query: () => ({
//     //         url: `/personalized`,
//     //       }),
//     //       providesTags: ['bucketlistRemoved', 'bucketlistAdded', 'visited'],
//     //     }),

//     //     // send friend request
//     //     sendFriendRequest: builder.mutation({
//     //       query: ({id}) => {
//     //         // console.log("id checking from backend: ", id);
//     //         return {
//     //           url: `/friend-request?friend_id=${id}`,
//     //           method: 'POST',
//     //         };
//     //       },
//     //       invalidatesTags: ['addFriends'],
//     //     }),

//     //     // cancel friend request
//     //     cancelFriendRequest: builder.mutation({
//     //       query: ({id}) => ({
//     //         url: `/cancel-request?friend_id=${id}&_method=PUT`,
//     //         method: 'POST',
//     //       }),
//     //       invalidatesTags: ['cancelFriendRequest'],
//     //     }),

//     //     // unfriend user
//     //     unfriendUser: builder.mutation({
//     //       query: ({id}) => ({
//     //         url: `/unfriend?friend_id=${id}`,
//     //         method: 'PUT',
//     //       }),
//     //       invalidatesTags: ['addFriends'],
//     //     }),

//     //     // get top destination
//     //     getTopDestination: builder.query({
//     //       query: () => ({
//     //         url: `/destination`,
//     //       }),
//     //       providesTags: ['bucketlistAdded'],
//     //     }),

//     //        // --------------------DONE all upp  -------------------

//     // // update password-DONE_________________________

//     // updatePassword: builder.mutation({
//     //   query: data => ({
//     //     url: `/update-password`,
//     //     method: 'POST',
//     //     body: data,
//     //   }),
//     // }),

//     // profile queries

//     //    // --------------------Done all down  -------------------

//     //   // get friends
//     //   getFriends: builder.query({
//     //     query: () => ({
//     //       url: `/user-friends?per_page=10&page=1`,
//     //     }),
//     //   }),

//     //   // other user profile data by id
//     //   getOthersProfile: builder.query({
//     //     query: ({id}) => ({
//     //       url: `/user-friend-profile?friend_id=${id}`,
//     //     }),
//     //     providesTags: [
//     //       'cancelFriendRequest',
//     //       'addFriends',
//     //       'cancelFriendRequest',
//     //     ],
//     //   }),

//     //  // --------------------DONE all upp  -------------------

//     //   // --------------------Done all down  -------------------

//     //   // get user friend attractions
//     //   getUserFriendAttractions: builder.query({
//     //     query: ({id}) => ({
//     //       url: `/user-friend-attraction?friend_id=${id}&per_page=10`,
//     //     }),
//     //   }),

//     //   // goals queries

//     //   // bucketlist attractions
//     //   getBucketListAttractions: builder.query({
//     //     query: () => ({
//     //       url: `/attraction-bucklist`,
//     //     }),
//     //     providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //   }),

//     //   // bucketlist cities
//     //   getBucketListCities: builder.query({
//     //     query: () => ({
//     //       url: `/city-bucklist`,
//     //     }),
//     //     providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //   }),

//     //   // bucketlist countries
//     //   getBucketListCountries: builder.query({
//     //     query: () => ({
//     //       url: `/country-bucklist`,
//     //     }),
//     //     providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     //   }),

//     //   // bucketlist banner
//     //   getBucketListBanner: builder.query({
//     //     query: () => ({
//     //       url: `/user-bucket`,
//     //     }),
//     //   }),

//     //   // add to bucket list
//     //   addToBucketList: builder.mutation({
//     //     query: ({id, data}) => {
//     //       return {
//     //         url: `/add-to-bucketlist?id=${id}`,
//     //         method: 'POST',
//     //         body: data,
//     //       };
//     //     },
//     //     invalidatesTags: ['bucketlistAdded'],
//     //   }),

//     //   // location visit
//     //   locationVisit: builder.mutation({
//     //     query: ({id, data}) => {
//     //       return {
//     //         url: `visited?id=${id}&_method=PUT`,
//     //         method: 'POST',
//     //         body: data,
//     //       };
//     //     },
//     //   }),

//     //   // get bucket list check
//     //   getBucketListCheck: builder.query({
//     //     query: ({id, type}) => {
//     //       return {
//     //         url: `/get-bucket?id=${id}&type=${type}`,
//     //       };
//     //     },
//     //     providesTags: ['bucketlistAdded', 'bucketlistRemoved'],
//     //   }),

//     //   // remove from bucket list
//     //   removeFromBucketList: builder.mutation({
//     //     query: ({id}) => {
//     //       return {
//     //         url: `/remove-user-bucketlist?id=${id}`,
//     //         method: 'PATCH',
//     //       };
//     //     },
//     //     invalidatesTags: ['bucketlistRemoved'],
//     //   }),

//     //      // --------------------DONE all upp  -------------------

//     // app dashboard
//     appDashboard: builder.query({
//       query: () => ({
//         url: `/app-dashboard`,
//       }),
//     }),

//     // get weekly quest progress
//     getWeeklyQuestProgress: builder.query({
//       query: () => ({
//         url: `/dashboard-weekly-quest-progress`,
//       }),
//     }),

//     // token validation check
//     validateToken: builder.query({
//       query: () => ({
//         url: `/validate-token`,
//       }),
//     }),

//     // get achievements
//     getAchievements: builder.query({
//       query: () => ({
//         url: `/get-achivevement`,
//       }),
//     }),

//     // shop banner
//     getShopBanner: builder.query({
//       query: () => ({
//         url: `/get-shopbanner`,
//       }),
//     }),

//     // get visited
//     getVisited: builder.query({
//       query: () => ({
//         url: `/get-visited`,
//       }),
//       providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
//     }),

//     // mark as visited
//     markAsVisited: builder.mutation({
//       query: ({id, data}) => {
//         return {
//           url: `/mark-visited?id=${id}&_method=PUT`,
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['visited'],
//     }),

//     // get mark as visited
//     getMarkAsVisited: builder.query({
//       query: ({id, type}) => {
//         return {
//           url: `/get-mark-visited?id=${id}&type=${type}`,
//         };
//       },
//       providesTags: ['visited'],
//     }),

//     // get notifications
//     getNotifications: builder.query({
//       query: () => ({
//         url: `/notifications`,
//       }),
//     }),

//     // get faq
//     getFaq: builder.query({
//       query: () => ({
//         url: `/get-faq`,
//       }),
//     }),

//     // get terms and conditions
//     getTermsAndConditions: builder.query({
//       query: () => ({
//         url: `/get-term_condition`,
//       }),
//     }),

//     // --------- travel preferences ---------

//     // get travel preferences
//     getTravelPreferences: builder.query({
//       query: () => ({
//         url: `/get-preference`,
//       }),
//       providesTags: ['travelInterest'],
//     }),

//     //  add travel interest
//     addTravelInterest: builder.mutation({
//       query: data => {
//         return {
//           url: `/travel-interest`,
//           method: 'POST',
//           body: data,
//         };
//       },
//       invalidatesTags: ['travelInterest'],
//     }),

//     // quests queries

//     // get weekly quests
//     getWeeklyQuests: builder.query({
//       query: () => ({
//         url: `/weekly-quests`,
//       }),
//     }),

//     // get quest achievements
//     getQuestAchievements: builder.query({
//       query: () => ({
//         url: `/quest-achievement`,
//       }),
//     }),
//   }),
// });

// export const {
//   useValidateTokenQuery,
//   useAppDashboardQuery,
//   useGetWeeklyQuestProgressQuery,
//   useGetAchievementsQuery,
//   useGetShopBannerQuery,
//   useGetVisitedQuery,
//   useMarkAsVisitedMutation,
//   useGetMarkAsVisitedQuery,

//   // notifications
//   useGetNotificationsQuery,

//   // settings
//   useGetFaqQuery,
//   useGetTermsAndConditionsQuery,

//   // travel preferences
//   useGetTravelPreferencesQuery,
//   useAddTravelInterestMutation,

//   // weekly quests
//   useGetWeeklyQuestsQuery,
//   useGetQuestAchievementsQuery,
// } = AuthSlice;
