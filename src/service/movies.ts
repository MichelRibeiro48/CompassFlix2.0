import {
  FavoriteMovieDTO,
  GetMoviesDTO,
  MovieAccountState,
  MovieCreditsDTO,
  MovieDetailsDTO,
} from '../types/moviesDTO';
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

export const getMovieDetails = async (
  id: number,
): Promise<MovieDetailsDTO | undefined> => {
  try {
    const response = await api.get<MovieDetailsDTO>(`/movie/${id}`, {
      params: {
        id,
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getMovieCredits = async (
  id: number,
): Promise<MovieCreditsDTO | undefined> => {
  try {
    const response = await api.get<MovieCreditsDTO>(`/movie/${id}/credits`, {
      params: {
        id,
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getMoviesAccountStates = async (
  id: number,
): Promise<MovieAccountState | undefined> => {
  try {
    const response = await api.get<MovieAccountState>(
      `/movie/${id}/account_states`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const postFavoriteMovie = async (
  id: number,
  body: {
    media_id: string;
    favorite: boolean;
    media_type: 'movie' | 'tv';
  },
): Promise<FavoriteMovieDTO | undefined> => {
  try {
    const response = await api.post<FavoriteMovieDTO>(
      `/account/${id}/favorite`,
      body,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postRateMovie = async (
  movie_id: number,
  body: {
    value: number;
  },
): Promise<FavoriteMovieDTO | number | undefined> => {
  try {
    const response = await api.post<FavoriteMovieDTO>(
      `/movie/${movie_id}/rating`,
      body,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
