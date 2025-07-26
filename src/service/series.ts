import {
  FavoriteMovieDTO,
  MovieAccountState,
  MovieCreditsDTO,
} from '../types/moviesDTO';
import {
  GetSeriesDTO,
  SeriesDetailsDTO,
  SeriesSeasonDetailsDTO,
} from '../types/seriesDTO';
import { api } from './api';

export const getPopularSeries = async (
  page: number,
): Promise<GetSeriesDTO | undefined> => {
  try {
    const response = await api.get<GetSeriesDTO>(`/tv/popular`, {
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

export const getDetailsSeries = async (
  id: number,
): Promise<SeriesDetailsDTO | undefined> => {
  try {
    const response = await api.get<SeriesDetailsDTO>(`/tv/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getDetailsSeriesSeasons = async (
  serie_id: number,
  season_id: number,
): Promise<SeriesSeasonDetailsDTO | undefined> => {
  try {
    const response = await api.get<SeriesSeasonDetailsDTO>(
      `/tv/${serie_id}/season/${season_id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getSeriesAccountStates = async (
  id: number,
): Promise<MovieAccountState | undefined> => {
  try {
    const response = await api.get<MovieAccountState>(
      `/tv/${id}/account_states`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getSerieCredits = async (
  id: number,
): Promise<MovieCreditsDTO | undefined> => {
  try {
    const response = await api.get<MovieCreditsDTO>(`/tv/${id}/credits`, {
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
export const postFavoriteSerie = async (
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

export const postRateSerie = async (
  movie_id: number,
  body: {
    value: number;
  },
): Promise<FavoriteMovieDTO | number | undefined> => {
  try {
    const response = await api.post<FavoriteMovieDTO>(
      `/tv/${movie_id}/rating`,
      body,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
