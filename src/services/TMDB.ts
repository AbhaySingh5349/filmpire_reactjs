import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

interface GetMoviesProps {
  genreIdOrCategoryName: string;
  page: number;
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
      query: ({ genreIdOrCategoryName, page }: GetMoviesProps) => {
        if (genreIdOrCategoryName && !isNumber(genreIdOrCategoryName)) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (genreIdOrCategoryName && isNumber(genreIdOrCategoryName)) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
  }),
});

// redux toolkit automatically creates hook for us
export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;

/*
 if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
          
        })

        */
