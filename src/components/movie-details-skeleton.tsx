import { Heart, Star } from "lucide-react";

const MovieDetailsSkeleton = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 ">
        <div className="min-h-100 bg-gray-500 animate-pulse"></div>
        <div>
          <div className="pb-4 border-b mb-6">
            <h2 className="font-bold text-lg md:text-3xl p-6 rounded-full bg-gray-500 animate-pulse mb-6"></h2>
            <p>
              <span className="text-sm text-gray-700"></span>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 w-fit text-sm rounded-md bg-gray-100 p-2 border border-gray-200">
                <Star className="stroke-0 fill-yellow-600 " />
                <span className="p-2 rounded-full bg-gray-500 animate-pulse"></span>
              </div>
              <p className="p-2 rounded-full bg-gray-500 animate-pulse"></p>
              <button className="flex items-center justify-between bg-blue-500 text-white p-2 rounded-md">
                <Heart className="stroke-0" />
                <span>Add to Favourite</span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <p className="font-bold mb-4">Overview</p>
            <p className="p-2 rounded-full bg-gray-500 animate-pulse mb-2"></p>
            <p className="p-2 rounded-full bg-gray-500 animate-pulse mb-2"></p>
            <p className="p-2 rounded-full bg-gray-500 animate-pulse mb-2"></p>
            <p className="p-2 rounded-full bg-gray-500 animate-pulse"></p>
          </div>
          <div className="mb-6">
            <p className="font-bold mb-4">Genres</p>
            <div className="flex items-center gap-3">
              {Array.from({ length: 4 }).map((_) => (
                <p className="p-4 w-full text-sm font-semibold bg-gray-300 rounded-full animate-pulse"></p>
              ))}
            </div>
          </div>
          <table className="border-separate font-semibold border-spacing-y-8">
            <tr>
              <td>Release Date:</td>
              <td className="w-full p-2 rounded-full bg-gray-500 animate-pulse"></td>
            </tr>
            <tr>
              <td>Language</td>
              <td className="w-full p-2 rounded-full bg-gray-500 animate-pulse"></td>
            </tr>
            <tr>
              <td>Budget</td>
              <td className=" w-full p-2 rounded-full bg-gray-500 animate-pulse"></td>
            </tr>
            <tr>
              <td>Revenue</td>
              <td className="w-full p-2 rounded-full bg-gray-500 animate-pulse"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsSkeleton
