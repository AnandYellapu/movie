import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '08dae2f2c9d6d30771d242d83ab1cfa0';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return response.data;
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







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_KEY = '08dae2f2c9d6d30771d242d83ab1cfa0';

// export const fetchMovies = createAsyncThunk(
//   'movies/fetchMovies',
//   async ({ query, page }) => {
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
//     );
//     return res.data;
//   }
// );

// const movieSlice = createSlice({
//   name: 'movies',
//   initialState: {
//     movies: [],
//     query: '',
//     page: 1,
//     totalPages: 1,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setQuery(state, action) {
//       state.query = action.payload;
//       state.page = 1;
//     },
//     setPage(state, action) {
//       state.page = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.movies = action.payload.results;
//         state.totalPages = action.payload.total_pages;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setQuery, setPage } = movieSlice.actions;
// export default movieSlice.reducer;
