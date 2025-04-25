import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './slice/ApiSlice';

const store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthSlice.middleware),
});

export default store;