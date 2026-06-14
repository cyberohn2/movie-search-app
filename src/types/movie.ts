// The following types are defined based on the results i got from tmdb

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  popularity: number;
  genre_ids?: number[];
};

export type MovieDetails = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  popularity: number;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type SearchFilters = {
  genre?: string;
  year?: string;
  rating?: string;
  sort?: string;
};
