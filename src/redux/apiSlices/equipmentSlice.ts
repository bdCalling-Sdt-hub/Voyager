import {api} from '../api/baseApi';

export const EquipmentSlice = api.injectEndpoints({
  endpoints: builder => ({
    // login

    // get avatar
    getAvatar: builder.query({
      query: () => ({
        url: `/get-shop-avatar`,
      }),
      providesTags: ['equipment'],
    }),
    // get avatar
    getDigitalSouvenir: builder.query({
      query: () => ({
        url: `/get-shop-digital-souvenir`,
      }),
      providesTags: ['equipment'],
    }),
    getPowerUps: builder.query({
      query: () => ({
        url: `/get-shop-powerups`,
      }),
      providesTags: ['equipment'],
    }),

    // "Avatars queries"
    buyShopAvatar: builder.mutation({
      query: data => {
        return {
          url: `/buy-shop-avatar`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),
    equipAvatar: builder.mutation({
      query: data => {
        return {
          url: `/equip_avatar`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),

    // digitals sourvien
    buyDigitalSouvenir: builder.mutation({
      query: data => {
        return {
          url: `/buy-digital-souvenir`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),
    equipDigitalSouvenir: builder.mutation({
      query: data => {
        return {
          url: `/equip_digital-souvenir`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),

    // power ups
    buyPowerUps: builder.mutation({
      query: data => {
        return {
          url: `/buy-powerup`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),
    equipPowerUps: builder.mutation({
      query: data => {
        return {
          url: `/equip_powerup`,
          params: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['equipment'],
    }),
  }),
});

export const {
  useGetAvatarQuery,
  useEquipAvatarMutation,
  useGetDigitalSouvenirQuery,
  useGetPowerUpsQuery,
  useBuyShopAvatarMutation,
  useBuyDigitalSouvenirMutation,
  useBuyPowerUpsMutation,
  useEquipDigitalSouvenirMutation,
  useEquipPowerUpsMutation,
} = EquipmentSlice;
