import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

const MovieCard = ({ movieDetails }: { movieDetails: Movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  return (
    <Link to={`/movie/${movieDetails.id}`}>
      <div className="min-h-50 relative rounded-lg overflow-hidden bg-gray-100">
        <p className="flex items-center gap-1 w-fit absolute top-0 right-0 bg-black/50 p-1 text-sm rounded-sm text-white">
          <Star className="stroke-0 fill-yellow-600" />
          <span>{movieDetails.vote_average.toFixed(1)}</span>
        </p>
        <img
          src={posterUrl}
          alt={movieDetails.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 mt-4">
        <p className="font-bold text-sm md:text-base">{movieDetails.title}</p>
        <p className="text-gray-500 text-sm">
          {movieDetails.release_date
            ? new Date(movieDetails.release_date).getFullYear()
            : "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
