import {api} from './BaseApi';

export const Attraction = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
   

    // explore get attractions
    getAttractions: builder.query({
        query: () => ({
          url: `/get-attraction`,
        }),
        providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
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
  
      // goals queries
  
      // bucketlist attractions
      getBucketListAttractions: builder.query({
        query: () => ({
          url: `/attraction-bucklist`,
        }),
        providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
      }),
  
      // bucketlist cities
      getBucketListCities: builder.query({
        query: () => ({
          url: `/city-bucklist`,
        }),
        providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
      }),
  
      // bucketlist countries
      getBucketListCountries: builder.query({
        query: () => ({
          url: `/country-bucklist`,
        }),
        providesTags: ['bucketlistRemoved', 'bucketlistAdded'],
      }),
  
      // bucketlist banner
      getBucketListBanner: builder.query({
        query: () => ({
          url: `/user-bucket`,
        }),
      }),
  
      // add to bucket list
      addToBucketList: builder.mutation({
        query: ({id, data}) => {
          return {
            url: `/add-to-bucketlist?id=${id}`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['bucketlistAdded'],
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
  
      // get bucket list check
      getBucketListCheck: builder.query({
        query: ({id, type}) => {
          return {
            url: `/get-bucket?id=${id}&type=${type}`,
          };
        },
        providesTags: ['bucketlistAdded', 'bucketlistRemoved'],
      }),
  
      // remove from bucket list
      removeFromBucketList: builder.mutation({
        query: ({id}) => {
          return {
            url: `/remove-user-bucketlist?id=${id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['bucketlistRemoved'],
      }),
  
  
  
  
  
  
  
  }),
});

export const { useGetAttractionsQuery, useGetCityQuery, useGetCountryQuery, useGetBucketListAttractionsQuery, useGetBucketListCitiesQuery, useGetBucketListCountriesQuery, useGetBucketListBannerQuery, useGetUserFriendAttractionsQuery, useGetBucketListCheckQuery, useAddToBucketListMutation, useRemoveFromBucketListMutation, useLocationVisitMutation, } = Attraction;




// import {api} from './BaseApi';

// export const AuthApiSlice = api.injectEndpoints({
//   overrideExisting: true,
//   endpoints: builder => ({
   

//   }),
// });

// export const {

  
// } = AuthApiSlice;
