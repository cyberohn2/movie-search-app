import axios from 'axios'
const apikey = import.meta.env.VITE_API_KEY;

export const searchApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&query=`,
});

export const baseApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key: apikey,
    language: "en-US",
    page: 1,
  }
});