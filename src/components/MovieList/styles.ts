import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap', // to wrap movies into multiple lines
    justifyContent: 'space-between',
    overflow: 'auto',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

export default useStyles;
