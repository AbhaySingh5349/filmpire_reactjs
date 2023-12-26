import React, { useState } from 'react';

import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import {
  useGetMovieByIdQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';

import useStyles from './styles';

import genreIcons from '../../assets/genres/index';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieList from '../MovieList/MovieList';

const MovieInformation = () => {
  console.log('MovieInformation component');

  const classes = useStyles();
  const dispatch = useDispatch(); // allows us to dispatch actions (transfering movieInfoData from component to redux)

  const [modalOpen, setModalOpen] = useState(false);

  const { id: movieId } = useParams();
  const {
    data: movieInfoData,
    isFetching: isFetchingMovieInfoData,
    error: errorMovieInfoData,
  } = useGetMovieByIdQuery(movieId);

  const { data: recomendationData, isFetching: isFetchingRecommendations } =
    useGetRecommendationsQuery({ movieId, list: '/recommendations' });

  console.log('movie info: ', movieInfoData);
  console.log('recomendationData: ', recomendationData);

  if (isFetchingMovieInfoData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (errorMovieInfoData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong, try again !</Link>
      </Box>
    );
  }

  const handleGenreSelection = (selectedGenre: string) => {
    dispatch(selectGenreOrCategory(selectedGenre));
  };

  let isMovieFavorited = true;
  let isMovieWatchlisted = true;

  const addToFavourites = () => {};

  const addToWatchlist = () => {};

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ marginTop: '0px' }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${movieInfoData?.poster_path}`}
          alt={movieInfoData?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {movieInfoData?.title} ({movieInfoData?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {movieInfoData?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={movieInfoData?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px', marginTop: '8px' }}
            >
              {' '}
              {movieInfoData?.vote_average.toFixed(1)}{' '}
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {movieInfoData?.runtime} min.{' '}
            {movieInfoData?.spoken_languages.length > 0
              ? `/ ${movieInfoData?.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {/* (Immediately Invoked Function Expression) */}
          {movieInfoData?.genres?.map((genre: any) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => handleGenreSelection(`${genre.id}`)}
            >
              <img
                src={genreIcons[genre?.name.toLowerCase()]}
                alt="genre list item"
                className={classes.genreImages}
                height={15}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {movieInfoData?.overview}
        </Typography>
      </Grid>
      {/* <Typography variant="h5" gutterBottom style={{ marginTop: '16px' }}>
        Top Cast
      </Typography> */}
      <Grid item container spacing={2}>
        {/* (Immediately Invoked Function Expression) */}
        {movieInfoData &&
          movieInfoData?.credits?.cast
            ?.map(
              (character: any, idx: number) =>
                character.profile_path && (
                  <Grid
                    key={idx}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      className={classes.castImage}
                      src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                      alt={character.name}
                    />
                    <Typography color="textPrimary">
                      {character?.name}
                    </Typography>
                  </Grid>
                )
            )
            .slice(0, 6)}
      </Grid>
      <Grid item container style={{ marginTop: '2rem' }}>
        <div className={classes.buttonsContainer}>
          <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
            <ButtonGroup size="small" variant="outlined">
              <Button
                target="_blank"
                rel="noopener noreferer"
                href={movieInfoData?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target="_blank"
                rel="noopener noreferer"
                href={`https://www.imdb.com/title/${movieInfoData?.imdb_id}`}
                endIcon={<MovieIcon />}
              >
                IMDB
              </Button>
              <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
            <ButtonGroup size="small" variant="outlined">
              <Button
                onClick={addToFavourites}
                endIcon={
                  isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                }
              >
                {isMovieFavorited ? 'Unfavourite' : 'Favorite'}
              </Button>
              <Button
                onClick={addToFavourites}
                endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
              >
                {/* {isMovieWatchlisted ? 'Remove From Watchlist' : 'Add To Watchlist'} */}
                Watchlist
              </Button>
              <Button
                endIcon={<ArrowBack />}
                sx={{ borderColor: 'primary.main', textDecoration: 'none' }}
              >
                <Typography
                  component={Link}
                  to="/"
                  color="inherit"
                  variant="subtitle2"
                >
                  Back
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
        </div>
      </Grid>

      <Box style={{ marginTop: '5rem', width: '100%' }}>
        <Typography variant="h3" gutterBottom align="center">
          You Might Also Like
        </Typography>
      </Box>
      {recomendationData?.results.length > 0 ? (
        <MovieList movies={recomendationData?.results} />
      ) : (
        <Box>Sorry, No recomended movies found</Box>
      )}
    </Grid>
  );
};

export default MovieInformation;
