import { Star } from "lucide-react"
import { Link } from "react-router-dom";

const MovieCard = ({
  movieDetails,
}: {
  movieDetails: {
    id: number,
    poster_path: string;
    vote_average: number;
    title: string;
    release_date: string;
  };
}) => {
  return (
    <Link to={`/movie?id=${movieDetails?.id}`}>
      <div className="min-h-50 relative rounded-lg overflow-hidden">
        <p className="flex items-center gap-1 w-fit absolute top-0 right-0 bg-black/50 p-1 text-sm rounded-sm text-white">
          <Star className="stroke-0 fill-yellow-600 " />
          <span>{movieDetails?.vote_average.toFixed(1)}</span>
        </p>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
          alt={movieDetails?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 mt-4">
        <p className="font-bold">{movieDetails?.title}</p>
        <p className="text-gray-500">
          {new Date(movieDetails?.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard
