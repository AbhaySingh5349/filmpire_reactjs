import React, { useState, useEffect } from 'react';
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
// import Sidebar from '../Sidebar/Sidebar';
import { Sidebar, Search } from '../index';

import {
  moviesApi,
  fetchAuthenticationToken,
  createSessionId,
} from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';

const NavBar = () => {
  console.log('NavBar component');

  const { isAuthenticated, user } = useSelector(userSelector);

  console.log('user nav bar object: ', user);

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const token = localStorage.getItem('auth_token');
  const session_id_from_local_storage = localStorage.getItem('session_id');
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (session_id_from_local_storage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${session_id_from_local_storage}`
          );

          console.log(
            'session_id_from_local_storage: ',
            session_id_from_local_storage
          );

          dispatch(setUser(userData)); // setting user account to redux store
        } else {
          const new_session_id = await createSessionId();
          console.log('new session id: ', new_session_id);

          if (new_session_id) {
            const { data: userData } = await moviesApi.get(
              `/account?session_id=${new_session_id}`
            );

            console.log('userData: ', userData);

            dispatch(setUser(userData)); // setting user account to redux store
          }
        }
      }
    };

    loginUser();
  }, [token, dispatch, session_id_from_local_storage]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setIsDrawerOpen((prevState) => !prevState)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchAuthenticationToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
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
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen((prevState) => !prevState)}
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }} // to over-ride underline pieces of components
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar drawerState={isDrawerOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent" // since we always want sidebar to be visible on desktop devices
              open
              anchor="left"
              classes={{ paper: classes.drawerPaper }}
            >
              <Sidebar drawerState={isDrawerOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
