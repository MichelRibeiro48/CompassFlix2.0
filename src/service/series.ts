import { GetSeriesDTO } from '../types/seriesDTO';
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
