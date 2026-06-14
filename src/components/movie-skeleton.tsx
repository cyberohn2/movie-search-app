

const MovieSkeleton = () => {
  return (
    <div>
      <div className="min-h-50 relative rounded-md overflow-hidden bg-gray-500 animate-pulse"></div>
      <div className="space-y-4 mt-4">
        <p className="font-bold p-2 rounded-full bg-gray-500 animate-pulse"></p>
        <p className="p-2 rounded-full bg-gray-500 animate-pulse"></p>
      </div>
    </div>
  );
}

export default MovieSkeleton
