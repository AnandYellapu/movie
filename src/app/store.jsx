import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../components/movies/movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
