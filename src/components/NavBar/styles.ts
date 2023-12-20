import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20px',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // styles visible on devices with size > sm (non-mobile device)
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  linkButton: {},
}));

export default useStyles;
