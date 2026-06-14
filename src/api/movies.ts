import axios from "axios";
import type { Movie, MovieDetails, MovieListResponse } from "../types/movie";

const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error("Missing VITE_API_KEY environment variable.");
}

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "en-US",
    include_adult: false,
    page: 1,
  },
});

export const genreOptions = [
  { label: "All Genres", value: "" },
  { label: "Action", value: "28" },
  { label: "Adventure", value: "12" },
  { label: "Animation", value: "16" },
  { label: "Comedy", value: "35" },
  { label: "Crime", value: "80" },
  { label: "Drama", value: "18" },
  { label: "Fantasy", value: "14" },
  { label: "Horror", value: "27" },
  { label: "Mystery", value: "9648" },
  { label: "Sci-Fi", value: "878" },
];
// genre plus id copied from tmdb website

export const sortOptions = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Rating", value: "vote_average.desc" },
];

export const ratingOptions = [
  { label: "All Ratings", value: "" },
  { label: "8.0+", value: "8" },
  { label: "6.0+", value: "6" },
  { label: "4.0+", value: "4" },
];

export const yearOptions = [
  { label: "All Years", value: "" },
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
];

export async function getMovieList(listType: string): Promise<Movie[]> {
  const response = await tmdb.get<MovieListResponse>(`/movie/${listType}`);
  return response.data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await tmdb.get<MovieDetails>(`/movie/${id}`);
  return response.data;
}

export async function getSimilarMovies(id: string): Promise<Movie[]> {
  const response = await tmdb.get<MovieListResponse>(`/movie/${id}/similar`);
  return response.data.results;
}

export async function searchMovies(query: string, year?: string): Promise<Movie[]> {
  // tmdb search api only accepts years filter aside the query, so we only add the year query
    // reference: https://developer.themoviedb.org/reference/search-movie
    
  if (!query.trim()) {
    return [];
  }

  const response = await tmdb.get<MovieListResponse>("/search/movie", {
    params: {
      query,
      year: year || undefined,
      page: 1,
    },
  });

  return response.data.results;
}
