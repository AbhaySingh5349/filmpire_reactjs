import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '../index';

interface Props {
  movies: {
    id: number;
    original_language: string;
    title: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    poster_path: string;
  }[];
}

const MovieList = ({ movies }: Props) => {
  const classes = useStyles();
  console.log('MovieList len: ', movies?.length);
  console.log('MovieList: ', movies);
  return (
    <Grid container className={classes.moviesContainer}>
      {/* (Immediately Invoked Function Expression) */}
      {movies?.map((movie, idx) => (
        <Movie key={movie.id} movie={movie} idx={idx} />
      ))}
    </Grid>
  );
};

export default MovieList;
