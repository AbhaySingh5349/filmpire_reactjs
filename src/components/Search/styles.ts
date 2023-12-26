import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  input: {
    color: theme.palette.mode === 'light' ? 'black' : 'invert(1)',
    filter: theme.palette.mode === 'light' ? 'invert(1)' : 'black',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
}));

export default useStyles;
