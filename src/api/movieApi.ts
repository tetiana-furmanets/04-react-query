import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // новий v3 ключ

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'uk-UA',
  },
});

export const searchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>('/search/movie', {
    params: { query, page },
  });

  return data;
};
