import {api} from '../api/baseApi';

export const BucketSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // bucketlist attractions
    getBucketListAttractions: builder.query({
      query: () => ({
        url: `/attraction-bucklist`,
      }),
      providesTags: ['bucket'],
    }),

    // bucketlist cities
    getBucketListCities: builder.query({
      query: () => ({
        url: `/city-bucklist`,
      }),
      providesTags: ['bucket'],
    }),
    // bucketlist cities
    getBucketListProgress: builder.query({
      query: () => ({
        url: `/dashboard-bucklist-progress`,
      }),
      providesTags: ['bucket'],
    }),

    // bucketlist countries
    getBucketListCountries: builder.query({
      query: () => ({
        url: `/country-bucklist`,
      }),
      providesTags: ['bucket'],
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
      invalidatesTags: ['bucket', 'attractions', 'dashboard'],
    }),

    // get bucket list check
    getBucketListCheck: builder.query({
      query: ({id, type}) => {
        return {
          url: `/get-bucket?id=${id}&type=${type}`,
        };
      },
      providesTags: ['bucket'],
    }),

    // remove from bucket list
    removeFromBucketList: builder.mutation({
      query: ({id}) => {
        return {
          url: `/remove-user-bucketlist?id=${id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['bucket', 'attractions', 'dashboard'],
    }),
  }),
});

export const {
  useGetBucketListAttractionsQuery,
  useGetBucketListCitiesQuery,
  useGetBucketListCountriesQuery,
  useGetBucketListBannerQuery,
  useGetBucketListProgressQuery,
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
