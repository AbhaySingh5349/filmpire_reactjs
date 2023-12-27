import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

interface Props {
  currentPage: number;
  setCurrentPage: any;
  totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const classes = useStyles();

  const handlePrev = () => {
    setCurrentPage((prevPage: number) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage: number) => prevPage + 1);
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
