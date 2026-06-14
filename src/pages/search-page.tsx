import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../utils/api";
import MovieSkeleton from "../components/movie-skeleton";
import MovieCard from "../components/movie-card";
import { useSearchParams } from "react-router-dom";
import Search from "../components/search";

const SearchPage = () => {
    const [params] = useSearchParams()
    const query = params.get("query")
    
    const { data, isLoading, isError } = useQuery({
      queryKey: [query],
      // tmdb only supports year query filter. ref: https://developer.themoviedb.org/reference/search-movie So we'll only be adding that
      queryFn: () => searchApi.get(`${query}`).then((res) => res.data.results),
    });

  return (
    <div>
        <Search />
      {isError ? (
        <p>Error While fetching movies!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
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
};

export default SearchPage;
