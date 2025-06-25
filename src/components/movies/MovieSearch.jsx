import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setQuery, setPage } from '../../components/movies/movieSlice';
import Spinner from '../../components/common/Spinner/Spinner';
import Pagination from '../../components/common/Pagination/Pagination';
import MovieCard from '../../components/movies/MovieCard';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, query, page, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );

  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    if (!query) {
      dispatch(setQuery("popular"));
      dispatch(fetchMovies({ query: "popular", page: 1 }));
    } else {
      dispatch(fetchMovies({ query, page }));
    }
  }, [query, page, dispatch]);

  
  let debounceTimer;
  const handleSearch = (e) => {
    const input = e.target.value;
    setLocalQuery(input);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (input.trim()) {
        dispatch(setQuery(input));
      }
    }, 500);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) dispatch(setPage(newPage));
  };

  return (
    <div className="movie-search-container">
      <h1>{query === "popular" ? "Popular Movies" : "Search Results"}</h1>

      <input
        type="text"
        placeholder="Search for movies..."
        value={localQuery}
        onChange={handleSearch}
        aria-label="Movie search input"
      />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="movie-grid">
            {movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p>No movies found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieSearch;
