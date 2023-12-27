import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

interface GetMoviesProps {
  genreIdOrCategoryName: string;
  page: number;
  searchQuery: string;
}

function isNumber(str: string) {
  return !isNaN(Number(str));
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3` }),
  // (Immediately Invoked Function Expression)
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }: GetMoviesProps) => {
        // get  movies by search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by category
        if (genreIdOrCategoryName && !isNumber(genreIdOrCategoryName)) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by genre
        if (genreIdOrCategoryName && isNumber(genreIdOrCategoryName)) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovieById: builder.query({
      query: (movieId) =>
        `/movie/${movieId}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    getActorsDetails: builder.query({
      query: (actorId) => `/person/${actorId}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActorId: builder.query({
      query: ({ actorId, page }) =>
        `/discover/movie?with_cast=${actorId}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    getSavedList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

// redux toolkit automatically creates hook for us
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieByIdQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetSavedListQuery,
} = tmdbApi;
