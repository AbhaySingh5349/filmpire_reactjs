import React, { useState } from 'react';

import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import { ArrowBack } from '@mui/icons-material';

import { MovieList, Pagination } from '../index';

import useStyles from './styles';

const Actors = () => {
  console.log('Actors component');

  const classes = useStyles();
  const { id: actorId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const {
    data: actorData,
    isFetching: isFetchingActorData,
    error,
  } = useGetActorsDetailsQuery(actorId);

  const { data: movieData } = useGetMoviesByActorIdQuery({ actorId, page });

  if (isFetchingActorData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${actorData?.profile_path}`}
            alt={actorData.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {actorData?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(actorData?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" gutterBottom align="justify" paragraph>
            {actorData?.biography || 'Sorry, No biography yet...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${actorData?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movieData?.results.length > 0 && (
          <MovieList movies={movieData?.results} />
        )}
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={movieData?.results?.length}
        />
      </Box>
    </>
  );
};

export default Actors;
