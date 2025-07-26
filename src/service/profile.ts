import { MMKV } from 'react-native-mmkv';
import { GetMoviesDTO, userDetailsDTO, UserMediaList } from '../types/userDTO';
import { api } from './api';
import { listDetailsDTO } from '../types/listDTO';

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

export const getMediaList = async (): Promise<UserMediaList | undefined> => {
  try {
    const response = await api.get<UserMediaList>(
      `/account/${storage.getString('userID')}/lists`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const postMediaList = async (body: {
  name: string;
  description: string;
  language: 'pt-BR';
}): Promise<UserMediaList | undefined> => {
  try {
    const response = await api.post<UserMediaList>(`/list`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteMediaList = async (
  list_id: number,
): Promise<any | undefined> => {
  try {
    const response = await api.delete<any>(`/list/${list_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getMediaDetailsList = async (
  list_id: number,
): Promise<listDetailsDTO | undefined> => {
  try {
    const response = await api.get<listDetailsDTO>(`/list/${list_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
