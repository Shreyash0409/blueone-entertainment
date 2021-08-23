const API_KEY = process.env.REACT_APP_API_KEY;

//! BASE_URL for all the different endpoints.
const TRENDING_BASE_URL = `trending/all/day?api_key=${API_KEY}`;
const MOVIE_BASE_URL = `discover/movie?api_key=${API_KEY}`;
const SERIES_BASE_URL = `discover/tv?api_key=${API_KEY}`;
const SEARCH_BASE_URL = `search/`;
const CHIPS_BASE_URL = `genre/`;

export {
  API_KEY,
  TRENDING_BASE_URL,
  MOVIE_BASE_URL,
  SERIES_BASE_URL,
  SEARCH_BASE_URL,
  CHIPS_BASE_URL,
};
