import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { baseApi } from "../utils/api";
import MovieSkeleton from "./movie-skeleton";

export default function Similar({
  id,
}: {
  id: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () =>
      baseApi
        .get(`/movie/${id}/similar`)
        .then((res) => res.data.results),
  });

  return (
    <div className="overflow-hidden ">
      <div className=" mb-8">
        <h2 className="font-bold">Similar Movies</h2>
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
