import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '240px',
    // styles visible on devices with size < sm (mobile device)
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      marginLeft: '20px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // styles visible on devices with size > sm (non-mobile device)
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
  drawer: {
    // styles visible on devices with size > sm (non-mobile device)
    [theme.breakpoints.up('sm')]: {
      width: '240px',
      flexShrink: 0,
    },
  },
  drawerBackground: {
    width: '200px',
  },
  drawerPaper: {},
}));

export default useStyles;
