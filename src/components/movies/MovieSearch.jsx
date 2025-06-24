import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setQuery, setPage } from '../../components/movies/movieSlice';
import Spinner from '../../components/common/Spinner/Spinner';
import Pagination from '../../components/common/Pagination/Pagination';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, query, page, totalPages, loading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (query) dispatch(fetchMovies({ query, page }));
  }, [query, page, dispatch]);

  const handleSearch = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) dispatch(setPage(newPage));
  };

  return (
    <div className="movie-search-container">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearch}
      />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview?.slice(0, 100)}...</p>
              </div>
            ))}
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
