import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  container: {
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
}));

export default useStyles;
