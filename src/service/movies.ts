import { GetMoviesDTO } from '../types/moviesDTO';
import { api } from './api';

export const getPopularMovies = async (
  page: number,
): Promise<GetMoviesDTO | undefined> => {
  try {
    const response = await api.get<GetMoviesDTO>(`/movie/popular`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
