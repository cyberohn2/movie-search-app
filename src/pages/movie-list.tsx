import { useQuery } from "@tanstack/react-query";
import { getMovieList } from "../api/movies";
import MovieSkeleton from "../components/movie-skeleton";
import MovieCard from "../components/movie-card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { ErrorState } from "../components/states";

const MovieList = ({
  details,
}: {
  details: { listName: string; listType: string };
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", details.listType],
    queryFn: () => getMovieList(details.listType),
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-lg md:text-3xl">{details.listName}</h2>
      </div>
      {isError ? (
        <ErrorState message="Error while fetching movies. Please refresh the page." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))
            : data?.map((movie: Movie) => (
                <MovieCard movieDetails={movie} key={movie.id} />
              ))}
        </div>
      )}
    </div>
  );
};

export default MovieList
