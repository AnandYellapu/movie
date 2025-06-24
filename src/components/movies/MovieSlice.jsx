import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoviesAPI } from '../../utils/movieApi';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, page }) => {
    const data = await fetchMoviesAPI(query, page);
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    loading: false,
    movies: [],
    page: 1,
    totalPages: 1,
    query: '',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, setPage } = movieSlice.actions;
export default movieSlice.reducer;
