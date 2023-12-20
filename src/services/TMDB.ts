import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3` }),
  // (Immediately Invoked Function Expression)
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page) => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

// redux toolkit automatically creates hook for us
export const { useGetMoviesQuery } = tmdbApi;
