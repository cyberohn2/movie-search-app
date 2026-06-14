import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { baseApi } from "../utils/api";
import MovieSkeleton from "./movie-skeleton";
import { Link } from "react-router-dom";

export default function Section({details} : {details: {sectionName: string, movieType: string}}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [details.movieType],
    queryFn: () => baseApi.get(`/movie/${details.movieType}`).then((res) => res.data.results),
  });

  return (
    <div className="overflow-hidden ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">{details.sectionName}</h2>
        <Link className="font-bold text-blue-500" to={details.movieType}>
          See All
        </Link>
      </div>
      {isError ? (
        <p>Error While fetching movies, Pls refresh the page</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))
            : data?.slice(0, 5)?.map((data: any) => {
                return <MovieCard movieDetails={data} key={data.id} />;
              })}
        </div>
      )}
    </div>
  );
}
