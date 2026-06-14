import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { getMovieList } from "../api/movies";
import MovieSkeleton from "./movie-skeleton";
import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { ErrorState } from "./states";

export default function Section({
  details,
}: {
  details: { sectionName: string; movieType: string };
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", details.movieType],
    queryFn: () => getMovieList(details.movieType),
  });

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">{details.sectionName}</h2>
        <Link className="font-bold text-blue-500" to={details.movieType}>
          See All
        </Link>
      </div>
      {isError ? (
        <ErrorState message="Error while fetching movies. Please refresh the page." />
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

