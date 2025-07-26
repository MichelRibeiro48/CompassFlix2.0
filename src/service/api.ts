import axios from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});

export const postMediaInList = async (
  list_id: number,
  body: {
    media_id: number;
    media_type: 'movie' | 'tv';
  },
): Promise<any> => {
  try {
    const response = await api.post<any>(`/list/${list_id}/add_item`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

api.interceptors.request.use(requestLogger);
api.interceptors.response.use(responseLogger);
