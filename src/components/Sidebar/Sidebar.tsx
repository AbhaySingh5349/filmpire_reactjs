import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // to know current theme is light or dark

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres/index';

import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];

interface GenreProps {
  id: number;
  name: string;
}

const genres = [
  {
    label: 'Comedy',
    value: 'comedy',
  },
  {
    label: 'Action',
    value: 'action',
  },
  {
    label: 'Horror',
    value: 'horror',
  },
  {
    label: 'Animation',
    value: 'animation',
  },
];

interface Props {
  drawerState: boolean;
}

const Sidebar = ({ drawerState }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery('');
  const dispatch = useDispatch(); // allows us to dispatch actions (transfering data from component to redux)

  const handleGenreSelection = (selectedGenre: string) => {
    dispatch(selectGenreOrCategory(selectedGenre));
  };

  // when we created slices, we dont have API calls from Redux-Toolkit-Query
  // now we need to use Selector to get data out of it
  // const { genreIdOrCategoryName } = useSelector(
  //   (state: any) => state.currentGenreOrCategory
  // );

  // console.log('genreIdOrCategoryName: ', genreIdOrCategoryName);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // console.log('genres data: ', data?.genres);
  // console.log('genreIcons: ', genreIcons);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data?.genres.map(({ id, name }: GenreProps) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem onClick={() => handleGenreSelection(`${id}`)} button>
                <ListItemIcon>
                  <img
                    src={name ? genreIcons[name.toLowerCase()] : redLogo}
                    alt="genre list item"
                    className={classes.genreImages}
                    height={15}
                  />
                </ListItemIcon>
                {/* name.toLowerCase() */}
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => handleGenreSelection(value)} button>
              <ListItemIcon>
                <img
                  src={redLogo}
                  alt="category list item"
                  className={classes.genreImages}
                  height={15}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
