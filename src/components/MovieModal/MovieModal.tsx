import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root')!;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop}>
      <button
        type="button"
        className={css.backdropButton}
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className={css.modal}>
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>

        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;
