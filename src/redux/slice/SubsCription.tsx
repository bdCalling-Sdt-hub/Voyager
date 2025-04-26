import { api } from "./BaseApi";

export const AuthSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getSubscription: builder.query({
      query: () => ({
        url: `/get-subscription`,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: data => ({
        url: `/stripe-payment-intent`,
        method: 'POST',
        body: data,
      }),
    }),

    paymentSuccess: builder.mutation({
      query: data => ({
        url: `/transaction`,
        method: 'POST',
        body: data,
      }),
    }),

    getMysubscription: builder.query({
      query: ({id}) => ({
        url: `/my-subscription?user_id=${id}`,
      }),
    }),
    invoichistory: builder.query({
      query: () => ({
        url: `/invoice-history`,
      }),
    }),



  }),
});

export const { 
  useGetSubscriptionQuery,
  useCreatePaymentIntentMutation,
  usePaymentSuccessMutation,
  useGetMysubscriptionQuery,
  useInvoichistoryQuery
} = AuthSlice;