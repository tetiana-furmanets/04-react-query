import React from 'react';
import css from './MovieList.module.css';
import type { Movie } from '../../types/movie';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
            />
          ) : (
            <div className={css.noImage}>No Image</div>
          )}
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieList; 
