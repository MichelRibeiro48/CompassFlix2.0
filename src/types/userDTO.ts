export interface userDetailsDTO {
  avatar?: Avatar;
  id?: number;
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  include_adult?: boolean;
  username?: string;
  success?: boolean;
  status_code?: number;
  status_message?: string;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path: any;
}

export interface GetMoviesDTO {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface UserRatingDTO {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number;
}

export interface UserMediaList {
  page: number;
  results: MediaListResult[];
  total_pages: number;
  total_results: number;
}

export interface MediaListResult {
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  list_type: string;
  name: string;
  poster_path?: string;
}
