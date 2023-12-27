import React, { useEffect } from 'react';

import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { useGetSavedListQuery } from '../../services/TMDB';

import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { SavedMovies } from '../index';

const Profile = () => {
  console.log('Profile component');

  const { user } = useSelector(userSelector);

  const { data: favoriteData, refetch: refetchFavorites } =
    useGetSavedListQuery({
      listName: 'favorite/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });

  const { data: watchlistData, refetch: refetchWatchlist } =
    useGetSavedListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });

  // to refresh page automatically
  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, [refetchFavorites, refetchWatchlist]);

  const logOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');

    window.location.href = '/';
  };

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

      {!favoriteData?.results?.length ? (
        <Typography variant="h5">Add Favourite Movies</Typography>
      ) : (
        <Box>
          <SavedMovies title="Favourite Movies" data={favoriteData.results} />
        </Box>
      )}
      {!watchlistData?.results?.length ? (
        <Typography variant="h5">
          Add Movies to Watchlist to watch them
        </Typography>
      ) : (
        <Box>
          <SavedMovies title="Watchlist Movies" data={watchlistData.results} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
