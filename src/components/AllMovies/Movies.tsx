import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '../index';

import { useSelector } from 'react-redux';

const Movies = () => {
  console.log('Movies component');

  const [page, setPage] = useState(1);

  // when we created slices, we dont have API calls from Redux-Toolkit-Query
  // now we need to use Selector to get data out of it
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state: any) => state.currentGenreOrCategory
  );

  // console.log('genreIdOrCategoryName: ', genreIdOrCategoryName);

  const { data, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

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

  return (
    <div>
      <MovieList movies={data?.results} />
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={data?.results?.length}
      />
    </div>
  );
};

export default Movies;
