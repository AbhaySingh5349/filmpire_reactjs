import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '10px 0 !important',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  poster: {
    borderRadius: '20px',
    boxShadow: '0.5rem 1em 1em rgb(64, 64, 70)',
    width: '80%',
    // styles visible on devices with size < md (tablet device)
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
    },
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

export default useStyles;
