import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { searchMovies } from '../../services/moviesApi';
import MovieList from '../MovieList/MovieList';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import type { MoviesResponse } from '../../types/movie';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<MoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query !== '',
  });

  return (
    <div>
      <SearchBar onSubmit={setQuery} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}

      {data && <MovieList movies={data.results} />}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
};

export default App;
