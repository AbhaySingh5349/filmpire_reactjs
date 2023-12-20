import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom'; // to switch between different pages

import useStyles from './styles';
import { useTheme } from '@mui/material/styles'; // to know current theme is light or dark

const NavBar = () => {
  console.log('NavBar component');

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => {}}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/123`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.everypixel.com%2Fimage-16715094954542298100&psig=AOvVaw24PeAYC8RlEck0mh4sboII&ust=1703144059836000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC1xJrAnYMDFQAAAAAdAAAAABAE"
                />
              </Button>
            )}
          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
