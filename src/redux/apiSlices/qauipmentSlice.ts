import {api} from '../api/baseApi';

export const EquipmentSlice = api.injectEndpoints({
  endpoints: builder => ({
    // login

    // get avatar
    getAvatar: builder.query({
      query: () => ({
        url: `/get-shop-avatar`,
      }),
      providesTags: ['updateAvatar'],
    }),

    // equip avatar
    equipAvatar: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/equip_avatar?id=${id}&_method=PUT`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['updateProfile', 'updateAvatar'],
    }),

    // buy avatar
    buyAvatar: builder.mutation({
      query: ({id}) => {
        return {
          url: `/buy-shop-avatar?id=${id}&_method=PUT`,
          method: 'POST',
        };
      },
      invalidatesTags: ['updateAvatar'],
    }),
  }),
});

export const {useGetAvatarQuery, useEquipAvatarMutation, useBuyAvatarMutation} =
  EquipmentSlice;
