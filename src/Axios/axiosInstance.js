import axios from "axios";

//! Helper file for axios instance.
const baseURL = "https://api.themoviedb.org/3/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
