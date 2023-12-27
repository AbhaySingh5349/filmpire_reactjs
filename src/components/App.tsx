import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Actors, Movies, MovieInformation, NavBar, Profile } from './index';
import useStyles from './styles';

function App() {
  const classes = useStyles(); // used as a hook
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <Routes>
          {['/', '/approved'].map((path) => (
            <Route path={path} element={<Movies />} />
          ))}
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
