import {api} from '../api/baseApi';

export const AttractionSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // explore get attractions
    getAttractions: builder.query({
      query: data => ({
        url: `/get-attraction`,
        params: data,
      }),
      providesTags: ['attractions'],
    }),
    getSinglePlaceAndImages: builder.query({
      query: ({place_image, id, type}) => {
        if (place_image) {
          return {
            url: `/place-details?id=${id}&type=${type}&place_image=${place_image}`,
          };
        } else {
          return {
            url: `/place-details?id=${id}&type=${type}`,
          };
        }
      },
      providesTags: ['attractions'],
    }),
    // get top destination
    getTopDestination: builder.query({
      query: () => ({
        url: `/destination`,
      }),
      providesTags: ['attractions'],
    }),
    // get personalized picks
    getPersonalized: builder.query({
      query: () => ({
        url: `/personalized`,
      }),
      providesTags: ['attractions'],
    }),
    // get city
    getCity: builder.query({
      query: data => ({
        url: `/get-city`,
        params: data,
      }),
      providesTags: ['attractions'],
    }),

    // get country
    getCountry: builder.query({
      query: data => ({
        url: `/get-country`,
        params: data,
      }),
      providesTags: ['attractions'],
    }),

    // get user friend attractions
    getUserFriendAttractions: builder.query({
      query: ({id}) => ({
        url: `/user-friend-attraction?friend_id=${id}&per_page=10`,
      }),
      providesTags: ['attractions'],
    }),
    // get visited
    getVisited: builder.query({
      query: () => ({
        url: `/get-visited`,
      }),
      providesTags: ['attractions'],
    }),
    //     // get mark as visited
    getMarkAsVisited: builder.query({
      query: ({id, type}) => {
        return {
          url: `/get-mark-visited?id=${id}&type=${type}`,
        };
      },
      providesTags: ['attractions'],
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
      invalidatesTags: ['attractions', 'bucket', 'dashboard', 'auth'],
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
      // invalidatesTags: ['attractions'],
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
  useGetSinglePlaceAndImagesQuery,
} = AttractionSlice;
