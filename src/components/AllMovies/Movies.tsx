import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '../index';

const Movies = () => {
  console.log('Movies component');
  const { data, error, isFetching } = useGetMoviesQuery(2);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="16px">
        <Typography variant="h4">
          No movies matched
          <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }

  // if (error) return 'An error occured while fetching movies';

  return (
    <div>
      <MovieList movies={data?.results} />
    </div>
  );
};

export default Movies;
