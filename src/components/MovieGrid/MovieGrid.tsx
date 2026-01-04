import React from 'react';
import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <div className={css.grid}>
      {movies.map(movie => (
        <div
          key={movie.id}
          className={css.item}
          onClick={() => onMovieClick?.(movie)}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className={css.noImage}>No Image</div>
          )}
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
