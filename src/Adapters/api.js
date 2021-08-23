import axiosInstance from "../Axios/axiosInstance";
import {
  API_KEY,
  TRENDING_BASE_URL,
  MOVIE_BASE_URL,
  SERIES_BASE_URL,
  SEARCH_BASE_URL,
  CHIPS_BASE_URL,
} from "../config/baseUrlConfig";

//! Helper function for all the Api calls. That connects our react world to the movie database world.
const requestApiCalls = {
  fetchTrendingData: async (page) => {
    const endpoint = `${TRENDING_BASE_URL}&page=${page}`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchMovieData: async (page, genreForURL) => {
    const endpoint = `${MOVIE_BASE_URL}&page=${page}&with_genres=${genreForURL}`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchSeriesData: async (page, genreForURL) => {
    const endpoint = `${SERIES_BASE_URL}&page=${page}&with_genres=${genreForURL}`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchSearchData: async (page, query, type) => {
    const endpoint = `${SEARCH_BASE_URL}${
      type ? "tv" : "movie"
    }?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchModalData: async (media_type, id) => {
    const endpoint = `${media_type}/${id}?api_key=${API_KEY}&language=en-US`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchVideoData: async (media_type, id) => {
    const endpoint = `${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchChipsData: async (type) => {
    const endpoint = `${CHIPS_BASE_URL}${type}/list?api_key=${API_KEY}&language=en-US`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },

  fetchCreditsData: async (media_type, id) => {
    const endpoint = `${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  },
};

export default requestApiCalls;
