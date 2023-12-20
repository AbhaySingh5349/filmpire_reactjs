// to configure redux toolkit store

import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

const store = configureStore({
  // type of data we will be dealing with
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
