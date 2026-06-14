import { ArrowLeft, Heart, Star } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { baseApi } from "../utils/api"
import { useQuery } from "@tanstack/react-query"
import Similar from "../components/similar"
import MovieDetailsSkeleton from "../components/movie-details-skeleton"

const MovieDetails = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    if (!id) {
      navigate("/")
    }

    const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () =>
        baseApi
        .get(`/movie/${id}`)
        .then((res) => res.data),
    });

    console.log(data)

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
        <p>Error While fetching movie, Pls refresh the page</p>
      ) : (
        <div className="grid lg:grid-cols-3 items-start gap-8 mb-8">
          <div className="">
            <img
              className="object-cover rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            />
          </div>
          <div className="cols col-span-2">
            <div className="pb-6 mb-6 border-b border-gray-500 space-y-6">
              <h2 className="font-bold text-lg md:text-3xl">
                {data?.original_title}
              </h2>
              <p>
                <span className="text-sm text-gray-700 font-semibold">
                  {new Date(data?.release_date).getFullYear()}
                </span>
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 w-fit text-sm rounded-md bg-gray-100 p-4 border border-gray-200">
                  <Star className="stroke-0 fill-yellow-600 " />
                  <span className="font-bold">
                    {data?.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className="font-semibold">{`(${data?.vote_count} votes)`}</p>
                <button className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-md">
                  <Heart className="stroke-0" />
                  <span>Add to Favourite</span>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <p className="font-bold mb-4">Overview</p>
              <p>{data?.overview}</p>
            </div>
            <div className="mb-6">
              <p className="font-bold mb-4">Genres</p>
              <div className="flex items-center gap-3">
                {data?.genres.map((gen: any) => (
                  <p className="p-2 text-sm font-semibold bg-gray-300 rounded-full">
                    {gen.name}
                  </p>
                ))}
              </div>
            </div>
            <table className="border-separate border-spacing-y-8 font-semibold">
              <tbody>
                <tr>
                  <td>Release Date:</td>
                  <td>{data?.release_date}</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>{data?.original_language}</td>
                </tr>
                <tr>
                  <td>Budget</td>
                  <td>${data?.budget}</td>
                </tr>
                <tr>
                  <td>Revenue</td>
                  <td>${data?.revenue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data && <Similar id={data?.id} />}
    </div>
  );
}

export default MovieDetails
