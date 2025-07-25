import axios from 'axios';
// import { requestLogger, responseLogger } from 'axios-logger';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});

// api.interceptors.request.use(requestLogger);
// api.interceptors.response.use(responseLogger);
