import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesAPI = async (query, page = 1) => {
  const isPopular = query.toLowerCase() === 'popular';

  const response = await axios.get(
    isPopular ? `${BASE_URL}/movie/popular` : `${BASE_URL}/search/movie`,
    {
      params: {
        api_key: API_KEY,
        ...(isPopular ? {} : { query }),
        page,
      },
    }
  );

  return response.data;
};
