import { Filter, SearchIcon } from "lucide-react"
import { useContext, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { SearchProviderContext } from "../contexts/search-context";

type FilterKey = "genre" | "year" | "rating" | "sort";
const filterOptions: {
  title: FilterKey;
  options: string[];
}[] = [
  {
    title: "genre",
    options: [
      "All Genres",
      "Thriller",
      "Action",
      "Horror",
      "Mystery",
      "Sci-Fi",
      "Animation",
      "Drama",
    ],
  },
  {
    title: "year",
    options: [
      "All Years",
      "2026",
      "2025",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
    ],
  },
  {
    title: "rating",
    options: ["All Rating", "8.0", "5.0", "3.0", ">3.0"],
  },
  {
    title: "sort",
    options: ["Popularity", "Rating"],
  },
];

const Search = () => {
    const navigate = useNavigate()
    const {query, filterQuery, setFilterQuery, setQuery} = useContext(SearchProviderContext)
    const debouncedQuery = useDebounce(query, 500);

    const [suggestion, setSuggestion] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const { data, isLoading } = useQuery({
      // tmdb only supports year query filter. ref: https://developer.themoviedb.org/reference/search-movie So we'll only be adding that
      queryKey: [
        `${debouncedQuery}${filterQuery.year && `&year=${filterQuery.year}`}`,
      ],
      queryFn: () =>
        searchApi
          .get(
            `${encodeURIComponent(debouncedQuery)}${filterQuery.year && `&year=${filterQuery.year}`}`,
          )
          .then((res) => res.data.results),
      enabled: !!debouncedQuery.trim(),
      placeholderData: (prev) => prev,
    });


    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        setFilterQuery({ ...filterQuery, [name]: value });
    }

    const clearFilter = () => {
        setFilterQuery({
          genre: "",
          year: "",
          rating: "",
          sort: "",
        });
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(
          `/search?query=${encodeURIComponent(debouncedQuery)}${filterQuery.year && `&year=${filterQuery.year}`}`,
        );
    }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-2 mb-4"
      >
        <div className="relative w-full">
          <div className="flex items-center bg-gray-100 p-2 border border-gray-200 rounded-md gap-2 w-full">
            <SearchIcon size={12} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSuggestion(true)}
              onBlur={() => query === "" && setSuggestion(false)}
              type="text"
              className="text-sm md:text-base w-full outline-0"
              placeholder="Search movies..."
            />
          </div>
          {suggestion && (
            <div className="min-h-25 bg-white absolute top-10 p-4 inset-x-0 shadow-xl z-50">
              {isLoading ? (
                <p className="p-2 rounded-full bg-gray-500 animate-pulse mb-2"></p>
              ) : (
                data?.map((result: any) => (
                  <Link
                    to={`/movie?id=${result?.id}`}
                    className="text-sm text-gray-700 font-semibold block p-4 hover:bg-gray-100 "
                  >
                    {result.original_title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setSuggestion(false);
            setShowFilter(!showFilter)}}
          className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-md"
        >
          <Filter size={12} />{" "}
          <span className=" text-sm md:text-base">Filters</span>
        </button>
      </form>
      {data && <p className="font-bold">Search Results for "{query}"</p>}
      {showFilter && (
        <div className={`lg:flex items-center justify-between`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {filterOptions.map((filter, index) => (
              <div key={index}>
                <p className="font-semibold text-sm capitalize">
                  {filter.title}
                </p>
                <select
                  className="font-semibold text-sm w-full bg-gray-100 p-2 border border-gray-200 rounded-md"
                  onChange={handleFilterChange}
                  value={filterQuery[filter.title]}
                  name={filter.title}
                  id={filter.title}
                >
                  {filter.options.map((opt, index) => (
                    <option key={index} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <p onClick={clearFilter} className="text-blue-500">
            Clear Filter
          </p>
        </div>
      )}
    </div>
  );
}

export default Search
