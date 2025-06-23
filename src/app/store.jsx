import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../components/movies/MovieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
