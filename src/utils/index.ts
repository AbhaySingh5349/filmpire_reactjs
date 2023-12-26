import axios from 'axios';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

const moviesApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key: tmdbApiKey,
  },
});

const fetchAuthenticationToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');

    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('auth_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (err) {
    console.log(`error while generating auth token: ${err}`);
  }
};

const createSessionId = async () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });

      localStorage.setItem('session_id', session_id);
      return session_id;
    } catch (err) {
      console.log(`error while generating session id: ${err}`);
    }
  }
};

export { moviesApi, fetchAuthenticationToken, createSessionId };
