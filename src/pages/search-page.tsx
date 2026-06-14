import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/movie-card";
import Search from "../components/search";
import { ErrorState, EmptyState, LoadingGrid } from "../components/states";
import type { Movie } from "../types/movie";
import { searchMovies } from "../api/movies";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const year = searchParams.get("year") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query, year),
  });

  return (
    <div>
      <Search />
      {isError ? (
        <ErrorState message="Error while fetching movies. Please try again." />
      ) : isLoading ? (
        <LoadingGrid />
      ) : data?.length === 0 ? (
        <EmptyState
          message={
            query
              ? `No results found for "${query}".`
              : "No movies found with the selected filters."
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          {data?.map((movie: Movie) => (
            <MovieCard movieDetails={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
