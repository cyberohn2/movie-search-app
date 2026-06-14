import { ArrowLeft, Heart, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies";
import Similar from "../components/similar";
import MovieDetailsSkeleton from "../components/movie-details-skeleton";
import { ErrorState } from "../components/states";
import type { MovieDetails as MovieDetailsType } from "../types/movie";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<MovieDetailsType>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id ?? ""),
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <ErrorState message="Movie not found. Please return to the homepage." />
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer mb-4 flex items-center gap-2"
      >
        <ArrowLeft /> Back
      </button>
      {isLoading ? (
        <MovieDetailsSkeleton />
      ) : isError ? (
        <ErrorState message="Error while fetching movie details. Please refresh the page." />
      ) : (
        <div className="space-y-8">
          <div className="grid lg:grid-cols-3 items-start gap-8 mb-8">
            <div>
              <img
                className="object-cover rounded-lg w-full"
                src={
                  data?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : "/placeholder-poster.png"
                }
                alt={data?.title}
              />
            </div>
            <div className="col-span-2">
              <div className="pb-6 mb-6 border-b border-gray-200 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-bold text-lg md:text-3xl">
                    {data?.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {data?.release_date
                      ? new Date(data.release_date).getFullYear()
                      : "N/A"}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex items-center gap-1 w-fit text-sm rounded-md bg-gray-100 p-3 border border-gray-200">
                    <Star className="stroke-0 fill-yellow-600" />
                    <span className="font-bold">
                      {data?.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">
                    ({data?.vote_count} votes)
                  </p>
                  <button className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-md">
                    <Heart className="" />
                    <span>Add to favourite</span>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <p className="font-bold mb-4">Overview</p>
                <p>{data?.overview}</p>
              </div>
              <div className="mb-6">
                <p className="font-bold mb-4">Genres</p>
                <div className="flex flex-wrap gap-3">
                  {data?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="p-2 text-sm font-semibold bg-gray-200 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <table className="border-separate border-spacing-y-4 font-semibold w-full">
                <tbody>
                  <tr>
                    <td className="pr-4 align-top">Release Date:</td>
                    <td>{data?.release_date || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Language:</td>
                    <td>{data?.original_language || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Runtime:</td>
                    <td>{data?.runtime ? `${data.runtime} min` : "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Status:</td>
                    <td>{data?.status || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Budget:</td>
                    <td>${data?.budget.toLocaleString() || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Revenue:</td>
                    <td>${data?.revenue.toLocaleString() || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {data && <Similar id={data.id.toString()} />}
    </div>
  );
};

export default MovieDetails;
