import { useQuery } from "@tanstack/react-query";
import { baseApi } from "../utils/api";
import MovieSkeleton from "../components/movie-skeleton";
import MovieCard from "../components/movie-card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieList = ({details}: {details: {listName: string, listType: string}}) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: [details.listType],
    queryFn: () =>
      baseApi
        .get(`/movie/${details.listType}`)
        .then((res) => res.data.results),
  });

  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-lg md:text-3xl">{details.listName}</h2>
      </div>
      {isError ? (
        <p>Error While fetching movies, Pls refresh the page</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))
            : data?.map((data: any) => {
                return <MovieCard movieDetails={data} key={data.id} />;
              })}
        </div>
      )}
    </div>
  );
 
}

export default MovieList
