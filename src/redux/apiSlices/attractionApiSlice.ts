import {api} from '../api/baseApi';

export const AttractionSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // explore get attractions
    getAttractions: builder.query({
      query: () => ({
        url: `/get-attraction`,
      }),
      providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
    }),
    // get top destination
    getTopDestination: builder.query({
      query: () => ({
        url: `/destination`,
      }),
      providesTags: ['bucketlistAdded'],
    }),
    // get personalized picks
    getPersonalized: builder.query({
      query: () => ({
        url: `/personalized`,
      }),
      providesTags: ['bucketlistRemoved', 'bucketlistAdded', 'visited'],
    }),
    // get city
    getCity: builder.query({
      query: () => ({
        url: `/get-city`,
      }),
      providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
    }),

    // get country
    getCountry: builder.query({
      query: () => ({
        url: `/get-country`,
      }),
      providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
    }),

    // get user friend attractions
    getUserFriendAttractions: builder.query({
      query: ({id}) => ({
        url: `/user-friend-attraction?friend_id=${id}&per_page=10`,
      }),
    }),
    // get visited
    getVisited: builder.query({
      query: () => ({
        url: `/get-visited`,
      }),
      providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
    }),
    //     // get mark as visited
    getMarkAsVisited: builder.query({
      query: ({id, type}) => {
        return {
          url: `/get-mark-visited?id=${id}&type=${type}`,
        };
      },
      providesTags: ['visited'],
    }),
    // mark as visited
    markAsVisited: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/mark-visited?id=${id}&_method=PUT`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['visited'],
    }),
    // location visit
    locationVisit: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `visited?id=${id}&_method=PUT`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAttractionsQuery,
  useGetCityQuery,
  useGetCountryQuery,
  useGetPersonalizedQuery,
  useGetUserFriendAttractionsQuery,
  useLocationVisitMutation,
  useGetMarkAsVisitedQuery,
  useGetVisitedQuery,
  useMarkAsVisitedMutation,
  useGetTopDestinationQuery,
} = AttractionSlice;
