import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { getSimilarMovies } from "../api/movies";
import MovieSkeleton from "./movie-skeleton";
import type { Movie } from "../types/movie";

export default function Similar({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id, "similar"],
    queryFn: () => getSimilarMovies(id),
    enabled: Boolean(id),
  });

  return (
    <div className="overflow-hidden">
      <div className="mb-8">
        <h2 className="font-bold">Similar Movies</h2>
      </div>
      {isError ? (
        <p>Error while fetching similar movies. Please refresh the page.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))
            : data
                ?.slice(0, 5)
                .map((movie: Movie) => (
                  <MovieCard movieDetails={movie} key={movie.id} />
                ))}
        </div>
      )}
    </div>
  );
}
