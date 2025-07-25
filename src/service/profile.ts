import { MMKV } from 'react-native-mmkv';
import { GetMoviesDTO, userDetailsDTO } from '../types/userDTO';
import { api } from './api';

const storage = new MMKV();
export const getDetailsProfile = async (): Promise<
  userDetailsDTO | undefined
> => {
  try {
    const response = await api.get<userDetailsDTO>('/account/details', {
      params: { session_id: storage.getString('session_id') },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getFavoritedMovies = async (): Promise<
  GetMoviesDTO | undefined
> => {
  try {
    const response = await api.get<GetMoviesDTO>(
      `/account/${storage.getString('userID')}/favorite/movies`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getRatedMovies = async (): Promise<GetMoviesDTO | undefined> => {
  try {
    const response = await api.get<GetMoviesDTO>(
      `/account/${storage.getString('userID')}/rated/movies`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getFavoritedTvShows = async (): Promise<
  GetMoviesDTO | undefined
> => {
  try {
    const response = await api.get<GetMoviesDTO>(
      `/account/${storage.getString('userID')}/favorite/tv`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getRatedTvShows = async (): Promise<GetMoviesDTO | undefined> => {
  try {
    const response = await api.get<GetMoviesDTO>(
      `/account/${storage.getString('userID')}/rated/tv`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
