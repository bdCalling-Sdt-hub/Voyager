import {api} from '../api/baseApi';

export const AuthSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getSubscription: builder.query({
      query: () => ({
        url: `/get-subscription`,
      }),
      providesTags: ['subscription'],
    }),

    createPaymentIntent: builder.mutation({
      query: data => ({
        url: `/stripe-payment-intent`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscription'],
    }),

    paymentSuccess: builder.mutation({
      query: data => ({
        url: `/transaction`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscription'],
    }),

    getMysubscription: builder.query({
      query: ({id}) => ({
        url: `/my-subscription?user_id=${id}`,
      }),
      providesTags: ['subscription'],
    }),
    invoichistory: builder.query({
      query: () => ({
        url: `/invoice-history`,
      }),
      providesTags: ['subscription'],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreatePaymentIntentMutation,
  usePaymentSuccessMutation,
  useGetMysubscriptionQuery,
  useInvoichistoryQuery,
} = AuthSlice;
