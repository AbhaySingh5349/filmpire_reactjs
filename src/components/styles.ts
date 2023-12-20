import { makeStyles } from '@mui/styles';

// (Immediately Invoked Function Expression)
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    padding: '2rem',
  },
  toolbar: {
    height: '70px',
  },
}));

export default useStyles;
