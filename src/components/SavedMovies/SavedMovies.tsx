import React from 'react';

import { Typography, Box } from '@mui/material';

import useStyles from './styles';

import { Movie } from '../index';

interface Props {
  title: string;
  data: any;
}

const SavedMovies = ({ title, data }: Props) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data.map((movie: any, idx: number) => (
          <Movie key={idx} movie={movie} idx={idx} />
        ))}
      </Box>
    </Box>
  );
};

export default SavedMovies;
