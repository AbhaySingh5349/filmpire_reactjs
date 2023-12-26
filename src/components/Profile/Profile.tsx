import React from 'react';

import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {
  console.log('Profile component');

  const logOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');

    window.location.href = '/';
  };

  const favouriteMovies = [];

  const { user } = useSelector(userSelector);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logOut}>
          LogOut &nbsp; <ExitToApp />{' '}
        </Button>
      </Box>

      {!favouriteMovies.length ? (
        <Typography variant="h5">
          Add Favourite Movies or Watchlist movies to watch them
        </Typography>
      ) : (
        <Box>Favourite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
