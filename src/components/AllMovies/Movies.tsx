import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  console.log('Movies component');
  const { data } = useGetMoviesQuery(2);
  console.log('data: ', data);

  return <div>Movies</div>;
};

export default Movies;
