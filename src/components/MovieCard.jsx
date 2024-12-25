import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, onDelete }) => {
    const navigate = useNavigate();
  return (
    <div
      key={movie._id}
      className="group relative bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Movie Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Movie Details */}
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
        <p className="text-gray-600 text-sm">Genre: {movie.genre}</p>
        <p className="text-gray-600 text-sm">
          Duration: {movie.duration} minutes
        </p>
        <p className="text-gray-600 text-sm">
          Release Year: {movie.releaseYear}
        </p>
        <p className="text-gray-600 text-sm">Rating: ⭐ {movie.rating}/10</p>
        {/* Overlay for Details Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-all duration-300"></div>

        <button
          onClick={() => navigate(`/movies/${movie._id}`)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
