import { Filter, Search as SearchIcon } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  searchMovies,
  genreOptions,
  ratingOptions,
  sortOptions,
  yearOptions,
} from "../api/movies";
import { LoadingGrid } from "./states";
import type { SearchFilters } from "../types/movie";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    genre: "",
    year: "",
    rating: "",
    sort: "",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const { data: suggestions, isLoading: isSuggestionsLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery, filters.year),
    enabled: Boolean(debouncedQuery.trim()),
    staleTime: 1000 * 60 * 5,
    placeholderData: [],
  });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({ genre: "", year: "", rating: "", sort: "" });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("query", query.trim());
    }
    if (filters.year) {
      params.set("year", filters.year);
    } 
    

    navigate(`/search?${params.toString()}`);
    setShowSuggestions(false);
  };

  const searchLabel = query.trim()
    ? `Search results for "${query}"`
    : "";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-2 mb-4"
      >
        <div
          className="relative w-full"
          tabIndex={-1}
          onBlur={() => setShowSuggestions(false)}
        >
          <div className="flex items-center bg-gray-100 p-2 border border-gray-200 rounded-md gap-2 w-full">
            <SearchIcon size={18} />
            <input
              aria-label="Search movies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              type="text"
              className="text-sm md:text-base w-full outline-0 bg-transparent"
              placeholder="Search movies..."
            />
          </div>
          {showSuggestions && (
            <div className="bg-white absolute top-14 left-0 right-0 rounded-xl shadow-xl z-50">
              {isSuggestionsLoading ? (
                <div className="p-4">
                  <LoadingGrid count={3} />
                </div>
              ) : (
                suggestions?.slice(0, 5).map((result) => (
                  <Link
                    key={result.id}
                    to={`/movie/${result.id}`}
                    className="block text-sm text-gray-700 font-semibold p-4 hover:bg-gray-100"
                  >
                    {result.title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowFilter((current) => !current)}
          className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-md"
        >
          <Filter size={16} />
          <span className="text-sm md:text-base">Filters</span>
        </button>
      </form>
      <p className="font-bold mb-4">{searchLabel}</p>
      {showFilter && (
        <div className="lg:flex items-center justify-between gap-4 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            <div>
              <p className="font-semibold text-sm">Genre</p>
              <select
                className="font-semibold text-sm w-full bg-gray-100 p-2 border border-gray-200 rounded-md"
                onChange={handleFilterChange}
                value={filters.genre}
                name="genre"
                id="genre"
              >
                {genreOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-semibold text-sm">Year</p>
              <select
                className="font-semibold text-sm w-full bg-gray-100 p-2 border border-gray-200 rounded-md"
                onChange={handleFilterChange}
                value={filters.year}
                name="year"
                id="year"
              >
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-semibold text-sm">Rating</p>
              <select
                className="font-semibold text-sm w-full bg-gray-100 p-2 border border-gray-200 rounded-md"
                onChange={handleFilterChange}
                value={filters.rating}
                name="rating"
                id="rating"
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-semibold text-sm">Sort</p>
              <select
                className="font-semibold text-sm w-full bg-gray-100 p-2 border border-gray-200 rounded-md"
                onChange={handleFilterChange}
                value={filters.sort}
                name="sort"
                id="sort"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={clearFilter}
            className="text-blue-500 font-semibold"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
