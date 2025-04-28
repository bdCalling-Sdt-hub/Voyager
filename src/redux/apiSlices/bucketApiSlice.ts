import {api} from '../api/baseApi';

export const BucketSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
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

export const {
  useGetBucketListAttractionsQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
  useGetBucketListBannerQuery,

  useGetBucketListCheckQuery,
  useAddToBucketListMutation,
  useRemoveFromBucketListMutation,
} = BucketSlice;

// import {api} from './BaseApi';

// export const AuthApiSlice = api.injectEndpoints({
//   overrideExisting: true,
//   endpoints: builder => ({

//   }),
// });

// export const {

// } = AuthApiSlice;
