import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
  params: {
    language: 'uk-UA',
  },
});

export const searchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await instance.get<MoviesResponse>('/search/movie', {
    params: { query, page },
  });
  return data;
};

export type { MoviesResponse };
